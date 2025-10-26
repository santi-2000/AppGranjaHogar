
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

/**
 * Performance Test for Products API
 * @module ProductsPerformanceTest
 * @description This module contains performance tests for the Products API.
 * It uses `k6` to simulate load and measure performance metrics.
 * * @author Carlos Alejandro Ortiz Caro
 */

export const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '10s', target: 50 }, 
    { duration: '30s', target: 50 }, 
    { duration: '10s', target: 0 },   
  ],
  thresholds: {
    errors: ['rate<0.01'], 
    http_req_duration: ['p(95)<500'], 
  },
};

const BASE_URL = 'http://localhost:8080/v1/products';

// Constante para el token de autorización
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywidXNlcm5hbWUiOiJ1c2VyIiwibmFtZSI6InlhaGlyIiwicGVybWlzc2lvbnMiOlsiYWRtaW4iXSwibGFzdF9uYW1lIjoidGFwaWEiLCJpYXQiOjE3NjEwMDc2MDgsImV4cCI6MTc5MjU0MzYwOH0.mQgBYOI165pk_xkb2FwCIHD7auzLNRr9YiXPftZ-32Q'; 

export default function () {
  let productId = null; 
  
  // 1. Create Product (POST)
  const createPayload = JSON.stringify({
    category_id: 1,
    unit_id: 1,
    name: `Juakin ${__VU}-${__ITER}`, 
    perishable: false,
    min_stock: 10,
    max_stock: 100,
  });

  const createParams = {
    headers: {
      'Content-Type': 'application/json',
      // -> AGREGADO: Encabezado de Autorización
      'Authorization': `Bearer ${AUTH_TOKEN}`, 
    },
    tags: { name: 'CreateProduct' }, 
  };

  const createRes = http.post(`${BASE_URL}/create`, createPayload, createParams);
  
  const createSuccess = check(createRes, {
    'Create: status is 200': (r) => r.status === 200,
    'Create: success is true': (r) => {
      try {
        return r.json() !== null && r.json().success === true;
      } catch (e) {
        return false; 
      }
    },
    'Create: product ID exists': (r) => {
      try {
        return r.json()?.product?.id !== undefined;
      } catch (e) {
        return false;
      }
    }
  });

  errorRate.add(!createSuccess);

  if (createSuccess) {
    try {
        productId = createRes.json().product.id;
    } catch (e) {
        errorRate.add(1);
        productId = null; 
    }
  }

  sleep(1); 

  // 2. Delete Product (DELETE)
  if (productId) {
    const deleteParams = {
        tags: { name: 'DeleteProduct' }, 
        headers: {
            // -> AGREGADO: Encabezado de Autorización
            'Authorization': `Bearer ${AUTH_TOKEN}`,
        },
    };
    
    const deleteRes = http.del(`${BASE_URL}/delete/${productId}`, null, deleteParams);
    
    const deleteSuccess = check(deleteRes, {
      'Delete: status is 200': (r) => r.status === 200,
      'Delete: success is true': (r) => {
        try {
            return r.json() !== null && r.json().success === true;
        } catch (e) {
            return false;
        }
      },
    });

    errorRate.add(!deleteSuccess);
  }
  
  sleep(1);
}