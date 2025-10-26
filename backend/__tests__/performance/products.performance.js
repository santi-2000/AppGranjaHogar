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
  const baseUrl = 'http://localhost:3000/v1/products';
  const params = {
    headers: {
      'Authorization': 'Bearer TOKEN_DE_PRUEBA',
    },
  };

  const resCatalog = http.get(`${baseUrl}/catalog`, params);
  check(resCatalog, {
    'GET /catalog status 200': (r) => r.status === 200,
    'GET /catalog <500ms': (r) => r.timings.duration < 500,
  });

  const resAvailable = http.get(`${baseUrl}/available-products`, params);
  check(resAvailable, {
    'GET /available-products status 200': (r) => r.status === 200,
    'GET /available-products <500ms': (r) => r.timings.duration < 500,
  });

  const resById = http.get(`${baseUrl}/1`, params);
  check(resById, {
    'GET /:id status 200': (r) => r.status === 200,
    'GET /:id <500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}