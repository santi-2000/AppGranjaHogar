import request from 'supertest';

import app from '../../app.js';

afterAll(async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  process.exit(0);
});

describe("Permission Controller integration tests", () => {
  describe('Get All Permissions Endpoint Test', () => {
    test('Given request When get all permissions Then status 200', async () => {
      await request(app)
        .get('/v1/permissions')
        .expect(200)
        .expect((res) => {
          expect(res.body).toBeInstanceOf(Array);
          expect(res.body.length).toBeGreaterThan(0);
          expect(res.body[0]).toHaveProperty('id');
          expect(res.body[0]).toHaveProperty('permission');
        });
    });
  });

  describe('Get User Permissions Endpoint Test', () => {
    test('Given valid user ID When get permissions Then status 200', async () => {
      await request(app)
        .get('/v1/permissions/user/1')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('user_id');
          expect(res.body).toHaveProperty('permissions');
          expect(res.body).toHaveProperty('permission_count');
          expect(res.body.user_id).toBe(1);
          expect(Array.isArray(res.body.permissions)).toBe(true);
        });
    });

    test('Given invalid user ID When get permissions Then error 400', async () => {
      await request(app)
        .get('/v1/permissions/user/invalid')
        .expect(400);
    });

    test('Given user with no permissions When get permissions Then empty array', async () => {
      await request(app)
        .get('/v1/permissions/user/3')
        .expect(200)
        .expect((res) => {
          expect(res.body.user_id).toBe(3);
          expect(res.body.permissions).toHaveLength(0);
          expect(res.body.permission_count).toBe(0);
        });
    });
  });

  describe('Update User Permissions Endpoint Test', () => {
    test('Given valid data When update permissions Then status 200', async () => {
      await request(app)
        .put('/v1/permissions/user/1')
        .send({
          "permission-ids": [1, 2, 3],
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.message).toBe('Permisos actualizados exitosamente');
        });
    });

    test('Given empty array When update permissions Then status 200', async () => {
      await request(app)
        .put('/v1/permissions/user/1')
        .send({
          "permission-ids": [],
        })
        .expect(200);
    });

    test('Given invalid user ID When update permissions Then error 400', async () => {
      await request(app)
        .put('/v1/permissions/user/invalid')
        .send({
          "permission-ids": [1, 2],
        })
        .expect(400);
    });

    test('Given invalid permission_ids format When update Then error 400', async () => {
      await request(app)
        .put('/v1/permissions/user/1')
        .send({
          "permission-ids": 'not-an-array',
        })
        .expect(400);
    });

    test('Given non-numeric permission IDs When update Then error 400', async () => {
      await request(app)
        .put('/v1/permissions/user/1')
        .send({
          "permission-ids": [1, 'invalid', 3],
        })
        .expect(400);
    });

    test('Given missing body When update permissions Then error 400', async () => {
      await request(app)
        .put('/v1/permissions/user/1')
        .send({})
        .expect(400);
    });
  });
});