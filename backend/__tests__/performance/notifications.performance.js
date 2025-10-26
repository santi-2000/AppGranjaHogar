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
  const baseUrl = 'http://localhost:3000/v1/notifications';
  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer TOKEN_DE_PRUEBA',
    },
  };

  const createBody = JSON.stringify({
    user_id: 2,
    product_id: 1,
    product_entry_id: null,
    product_out_id: null,
    content: 'Producto con bajo stock',
    type_id: 1,
    permission_id: 3,
  });

  const resCreate = http.post(baseUrl, createBody, params);
  check(resCreate, {
    'POST /notifications status 201': (r) => r.status === 201,
    'POST /notifications <500ms': (r) => r.timings.duration < 500,
  });

  const resGetAll = http.get(`${baseUrl}?permissions=1,2,3`, params);
  check(resGetAll, {
    'GET /notifications status 200': (r) => r.status === 200,
    'GET /notifications <500ms': (r) => r.timings.duration < 500,
  });

  const resGetById = http.get(`${baseUrl}/1`, params);
  check(resGetById, {
    'GET /notifications/:id status 200': (r) => r.status === 200,
    'GET /notifications/:id <500ms': (r) => r.timings.duration < 500,
  });

  const resDelete = http.del(`${baseUrl}/1`, null, params);
  check(resDelete, {
    'DELETE /notifications/:id status 200': (r) => r.status === 200,
    'DELETE /notifications/:id <500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}