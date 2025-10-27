import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 30,
  duration: '45s',
  thresholds: {
    http_req_duration: ['p(95)<600'],
    http_req_failed: ['rate<0.01'],
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8080';
const TOKEN = __ENV.JWT_TOKEN || '';

export default function () {
  const res = http.get(`${BASE_URL}/v1/product-outs`, {
    headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {},
  });

  check(res, {
    'status 200': r => r.status === 200,
    'json es array': r => {
      try { return Array.isArray(r.json()); } catch { return false; }
    },
  });

  sleep(1);
}
