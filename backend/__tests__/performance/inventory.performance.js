/** 
 * @fileoverview Pruebas de rendimiento para obtener el inventario utilizando K6.
 * Simula múltiples usuarios consultando el inventario simultáneamente.
 * Mide tiempos de respuesta y uso de recursos.
 * @author Roberto Santiago Estrada Orozco
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
  const url = 'http://localhost:3000/v1/products/inventory';

  const params = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer TOKEN_DE_PRUEBA',
    },
  };

  const res = http.get(url, params);

  check(res, {
    'status es 200': (r) => r.status === 200,
    'tiempo de respuesta < 500ms': (r) => r.timings.duration < 500,
    'tiene datos': (r) => r.body && r.body.length > 0,
  });

  sleep(1);
}

