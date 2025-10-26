import request from 'supertest';
import { jest } from '@jest/globals';
    
/**
 * Users Test
 * @module UsersControllerTest
 * @description This module contains unit tests for the UsersController.
 *              It uses `supertest` for making HTTP requests to the Express app
 *              and `jest` for mocking services and assertions.
 * 
 * @author Jared Alejandro Marquez Muñoz Grado
 * @author Renata Loaiza Bailon
 */

const loginServiceMock = jest.fn();
const verifyServiceMock = jest.fn();
const createUserServiceMock = jest.fn();
const updatePasswordServiceMock = jest.fn();
const deleteUserServiceMock = jest.fn();

jest.unstable_mockModule('../../services/users.service.js', () => ({
  usersService: {
    login: loginServiceMock,
    verify: verifyServiceMock,
    createUser: createUserServiceMock,
    updatePassword: updatePasswordServiceMock,
    deleteUser: deleteUserServiceMock,
  }
}));

const { default: app, connection } = await import('../../app.js');


describe("User Controller Unit Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    if (connection) {
      await connection.end();
    }
  });

  //Pruebas para el Endpoint de Login
  describe('POST /v1/users/login', () => {
    test('Given correct credentials, When login, Then return 200 and a token', async () => {
      // GIVEN
      loginServiceMock.mockResolvedValue('fake.jwt.token');

      // WHEN/THEN
      await request(app)
        .post('/v1/users/login')
        .send({ username: 'testuser', password: 'password123' })
        .expect(200)
        .expect(res => {
          expect(res.body.token).toBe('fake.jwt.token');
        });
    });

    test('Given incorrect password, When login, Then return 500', async () => {
      // GIVEN
      loginServiceMock.mockRejectedValue(new Error('Contraseña incorrecta'));

      // WHEN/THEN
      await request(app)
        .post('/v1/users/login')
        .send({ username: 'testuser', password: 'wrongpassword' })
        .expect(500);
    });

    test('Given non-existent username, When login, Then return 500', async () => {
      // GIVEN
      loginServiceMock.mockRejectedValue(new Error('Datos Incorrectos'));

      // WHEN/THEN
      await request(app)
        .post('/v1/users/login')
        .send({ username: 'nouser', password: 'password123' })
        .expect(500);
    });

    test('Given missing password, When login, Then return 400 for validation error', async () => {
      // WHEN/THEN
      await request(app)
        .post('/v1/users/login')
        .send({ username: 'testuser' })
        .expect(400);

      // THEN
      expect(loginServiceMock).not.toHaveBeenCalled();
    });

    test('Given password too short, When login, Then return 400 for validation error', async () => {
      // WHEN/THEN
      await request(app)
        .post('/v1/users/login')
        .send({ username: 'testuser', password: '123' })
        .expect(400);

      // THEN
      expect(loginServiceMock).not.toHaveBeenCalled();
    });
  });

  //Prueba para el Endpoint de Logout
  describe('POST /v1/users/logout', () => {
    test('Given no active session, When logout, Then return 400', async () => {
      await request(app)
        .post('/v1/users/logout')
        .expect(400)
        .expect(res => {
          expect(res.body.error).toBe("Sesion NO Iniciada");
        });
    });
  });

  //Pruebas para el Endpoint de Verificación de Token
  describe('POST /v1/users/verify', () => {
    test('Given a valid token in header, When verify, Then return 200', async () => {
      // GIVEN
      verifyServiceMock.mockResolvedValue();

      // WHEN/THEN
      await request(app)
        .post('/v1/users/verify')
        .set('Authorization', 'Bearer valid.token')
        .expect(200)
        .expect(res => {
          expect(res.body).toBe(true);
        });
    });

    test('Given an invalid token, When verify, Then return 500', async () => {
      // GIVEN
      verifyServiceMock.mockRejectedValue(new Error('Token inválido'));

      // WHEN/THEN
      await request(app)
        .post('/v1/users/verify')
        .set('Authorization', 'Bearer invalid.token')
        .expect(500);
    });

    test('Given no token, When verify, Then return 401 Unauthorized', async () => {
      // WHEN/THEN
      await request(app).post('/v1/users/verify').expect(401);
    });
  });

  //Pruebas para el Endpoint de Crear Usuario
  describe('POST /v1/users/new', () => {
    const mockRequest = {
      user: { id: 1, username: 'admin', permissions: ['manage-users'] }
    };

    test('Given valid user data, When create user, Then return 201 and user created', async () => {
      // GIVEN
      const mockCreatedUser = { insertId: 123 };
      const validUserData = {
        name: 'Camila',
        lastName: 'Beltran',
        username: 'camilabeltran',
        password: 'password123',
        permissions: ['products-entries', 'products-outs']
      };
      createUserServiceMock.mockResolvedValue(mockCreatedUser);

      // WHEN/THEN
      await request(app)
        .post('/v1/users/new')
        .set('Cookie', 'session=valid_session_token') // Simular sesión válida
        .send(validUserData)
        .expect(201)
        .expect(res => {
          expect(res.body.ok).toBe(true);
          expect(res.body.message).toBe('Usuario creado');
          expect(res.body.user).toEqual(mockCreatedUser);
        });
    });

    test('Given user data with username too short, When create user, Then return 400 for validation error', async () => {
      // GIVEN
      const invalidUserData = {
        name: 'Camila',
        lastName: 'Beltran',
        username: 'ca', // muy corto
        password: 'password123',
        permissions: ['products-entries']
      };

      // WHEN/THEN
      await request(app)
        .post('/v1/users/new')
        .set('Cookie', 'session=valid_session_token')
        .send(invalidUserData)
        .expect(400);

      // THEN
      expect(createUserServiceMock).not.toHaveBeenCalled();
    });

    test('Given user data with password too short, When create user, Then return 400 for validation error', async () => {
      // GIVEN
      const invalidUserData = {
        name: 'Camila',
        lastName: 'Beltran',
        username: 'camilabeltran',
        password: '123', // muy corto
        permissions: ['products-entries']
      };

      // WHEN/THEN
      await request(app)
        .post('/v1/users/new')
        .set('Cookie', 'session=valid_session_token')
        .send(invalidUserData)
        .expect(400);

      // THEN
      expect(createUserServiceMock).not.toHaveBeenCalled();
    });

    test('Given user data with invalid permissions, When create user, Then return 400 for validation error', async () => {
      // GIVEN
      const invalidUserData = {
        name: 'Camila',
        lastName: 'Beltran',
        username: 'camilabeltran',
        password: 'password123',
        permissions: ['invalid-permission']
      };

      // WHEN/THEN
      await request(app)
        .post('/v1/users/new')
        .set('Cookie', 'session=valid_session_token')
        .send(invalidUserData)
        .expect(400);

      // THEN
      expect(createUserServiceMock).not.toHaveBeenCalled();
    });

    test('Given service throws error, When create user, Then return 500', async () => {
      // GIVEN
      const validUserData = {
        name: 'Camila',
        lastName: 'Beltran',
        username: 'camilabeltran',
        password: 'password123',
        permissions: ['products-entries']
      };
      createUserServiceMock.mockRejectedValue(new Error('Error al crear usuario'));

      // WHEN/THEN
      await request(app)
        .post('/v1/users/new')
        .set('Cookie', 'session=valid_session_token')
        .send(validUserData)
        .expect(500);
    });
  });
});


