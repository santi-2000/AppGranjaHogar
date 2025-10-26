/** 
 * @fileoverview Pruebas de rendimiento para la creación de usuarios utilizando K6.
 * Simula múltiples usuarios creando cuentas simultáneamente.
 * Mide tiempos de respuesta y uso de recursos.
 * @author Renata Loaiza
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
  const url = 'http://localhost:3000/v1/users/new';
  
  // Generate unique username and email for each virtual user
  const randomSuffix = Math.floor(Math.random() * 100000);
  
  const payload = JSON.stringify({
    name: 'juan',
    lastName: 'perez',
    username: `testuser${randomSuffix}`,
    password: 'password123',
    permissions: ['products-entries', 'products-outs']
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

