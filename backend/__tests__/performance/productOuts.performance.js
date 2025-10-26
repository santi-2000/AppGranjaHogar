import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const url = 'http://localhost:3000/v1/product-outs/new';
  const payload = JSON.stringify({
    product_id: 1,
    user_id: 2,
    unit_id: 1,
    quantity: 5,
    reason: 'Uso en cocina',
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
    'devuelve JSON válido': (r) => r.headers['Content-Type']?.includes('application/json'),
  });

  sleep(1);
}