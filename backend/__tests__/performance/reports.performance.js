import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<800'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const baseUrl = 'http://localhost:3000/v1/reports';
  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer TOKEN_DE_PRUEBA',
    },
  };

  const body = JSON.stringify({
    user_id: 2,
    initial_date: '2025-01-01',
    end_date: '2025-12-31',
  });

  const resInventory = http.post(`${baseUrl}/inventory`, {}, params);
  check(resInventory, {
    'POST /inventory status 200': (r) => r.status === 200,
    'POST /inventory <800ms': (r) => r.timings.duration < 800,
  });

  const resEntries = http.post(`${baseUrl}/entries`, body, params);
  check(resEntries, {
    'POST /entries status 200': (r) => r.status === 200,
    'POST /entries <800ms': (r) => r.timings.duration < 800,
  });

  const resOuts = http.post(`${baseUrl}/outs`, body, params);
  check(resOuts, {
    'POST /outs status 200': (r) => r.status === 200,
    'POST /outs <800ms': (r) => r.timings.duration < 800,
  });

  const resReport = http.post(baseUrl, body, params);
  check(resReport, {
    'POST /reports status 201': (r) => r.status === 201,
    'POST /reports <800ms': (r) => r.timings.duration < 800,
  });

  sleep(1);
}