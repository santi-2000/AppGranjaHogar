import request from 'supertest';
import { jest } from '@jest/globals';

const getAllNotificationsMock = jest.fn();
const getNotificationByIdMock = jest.fn();
const createNotificationMock = jest.fn();
const deleteNotificationMock = jest.fn();

jest.unstable_mockModule('../../services/notifications.service.js', () => ({
  getAllNotificationsService: getAllNotificationsMock,
  getNotificationByIdService: getNotificationByIdMock,
  createNotificationService: createNotificationMock,
  deleteNotificationService: deleteNotificationMock,
}));

const { default: app, connection } = await import('../../app.js');

describe("Notifications Controller Unit Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    if (connection) await connection.end();
  });

  // GET 
  describe('GET /v1/notifications', () => {
    test('Given notifications exist, When fetching all, Then return 200 and list', async () => {
      // GIVEN
      getAllNotificationsMock.mockResolvedValue([
        { id: 1, title: 'Stock bajo', message: 'Producto casi agotado' },
        { id: 2, title: 'Vencimiento', message: 'Producto próximo a vencer' },
      ]);

      // WHEN/THEN
      await request(app)
        .get('/v1/notifications')
        .expect(200)
        .expect(res => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body[0]).toHaveProperty('id');
          expect(res.body[0]).toHaveProperty('title');
        });
    });

    test('Given DB error, When fetching all, Then return 500', async () => {
      // GIVEN
      getAllNotificationsMock.mockRejectedValue(new Error('DB Error'));

      // WHEN/THEN
      await request(app).get('/v1/notifications').expect(500);
    });
  });

  // GET
  describe('GET /v1/notifications/:id', () => {
    test('Given valid ID, When fetching, Then return 200 and object', async () => {
      getNotificationByIdMock.mockResolvedValue({
        id: 1,
        title: 'Stock bajo',
        message: 'Producto casi agotado',
      });

      await request(app)
        .get('/v1/notifications/1')
        .expect(200)
        .expect(res => {
          expect(res.body).toHaveProperty('id', 1);
        });
    });

    test('Given invalid ID, When fetching, Then return 400', async () => {
      await request(app).get('/v1/notifications/invalid').expect(400);
    });

    test('Given not found, When fetching, Then return 404', async () => {
      getNotificationByIdMock.mockResolvedValue(null);

      await request(app)
        .get('/v1/notifications/99')
        .expect(404);
    });
  });

  // POST
  describe('POST /v1/notifications', () => {
    test('Given valid data, When creating, Then return 201', async () => {
      createNotificationMock.mockResolvedValue({
        id: 1,
        title: 'Nuevo aviso',
        message: 'Pedido recibido',
      });

      await request(app)
        .post('/v1/notifications')
        .send({ title: 'Nuevo aviso', message: 'Pedido recibido' })
        .expect(201)
        .expect(res => {
          expect(res.body).toHaveProperty('id');
        });
    });

    test('Given invalid data, When creating, Then return 400', async () => {
      await request(app)
        .post('/v1/notifications')
        .send({})
        .expect(400);
    });
  });
 
  // DELETE
  describe('DELETE /v1/notifications/:id', () => {
    test('Given valid ID, When deleting, Then return 200', async () => {
      deleteNotificationMock.mockResolvedValue(true);

      await request(app).delete('/v1/notifications/1').expect(200);
    });

    test('Given invalid ID, When deleting, Then return 400', async () => {
      await request(app).delete('/v1/notifications/invalid').expect(400);
    });

    test('Given service error, When deleting, Then return 500', async () => {
      deleteNotificationMock.mockRejectedValue(new Error('DB Error'));

      await request(app).delete('/v1/notifications/1').expect(500);
    });
  });
});
