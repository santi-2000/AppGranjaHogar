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
  const url = 'http://localhost:3000/v1/permissions';
  const params = {
    headers: {
      'Authorization': 'Bearer TOKEN_DE_PRUEBA',
    },
  };

  const res = http.get(url, params);

  check(res, {
    'status es 200': (r) => r.status === 200,
    'tiempo de respuesta < 500ms': (r) => r.timings.duration < 500,
    'devuelve JSON válido': (r) => r.headers['Content-Type']?.includes('application/json'),
  });

  sleep(1);
}