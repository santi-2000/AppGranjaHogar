/** 
 * @fileoverview Pruebas de rendimiento para la creación de entradas de productos utilizando K6.
 * Simula múltiples usuarios creando entradas simultáneamente.
 * Mide tiempos de respuesta y uso de recursos.
 * @author Dania Sagarnaga Macías
 */

import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,        
  duration: '30s',   
  thresholds: {
    http_req_duration: ['p(95)<500'],
  },
};

export default function () {
  const url = 'http://localhost:3000/v1/product-entries/new';
  const payload = JSON.stringify({
    product_id: 1,
    user_id: 2,
    unit_id: 1,
    is_donation: true,
    quantity: 10,
    cost: 0,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer TOKEN_DE_PRUEBA',
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status es 201': (r) => r.status === 201,
    'tiempo de respuesta < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}