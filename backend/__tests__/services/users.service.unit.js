import 'dotenv/config';
import { jest } from '@jest/globals';

/**
 * Users Service Test
 * @module UsersServiceTest
 * @description This module contains unit tests for the UsersService.
 *              It uses `jest` for mocking services and assertions.
 * 
 * @author Jared Alejandro Marquez Muñoz Grado
 * @author Renata Loaiza Bailon
 */

const loginModelMock = jest.fn();
const bcryptCompareMock = jest.fn();
const jwtSignMock = jest.fn();
const jwtVerifyMock = jest.fn();
const createModelMock = jest.fn();
const addPermissionsToUserModelMock = jest.fn();
const bcryptGenSaltMock = jest.fn();
const bcryptHashMock = jest.fn();
const addNotificationServiceMock = jest.fn();

jest.unstable_mockModule('../../models/users.model.js', () => ({
  usersModel: {
    loginModel: loginModelMock,
    create: createModelMock,
    addPermissionsToUser: addPermissionsToUserModelMock,
  }
}));

jest.unstable_mockModule('bcryptjs', () => ({
  default: { 
    compare: bcryptCompareMock,
    genSalt: bcryptGenSaltMock,
    hash: bcryptHashMock
  }
}));

jest.unstable_mockModule('jsonwebtoken', () => ({
  default: { sign: jwtSignMock, verify: jwtVerifyMock }
}));

jest.unstable_mockModule('../../services/notifications.service.js', () => ({
  notificationService: {
    addNotification: addNotificationServiceMock
  }
}));

jest.unstable_mockModule('../../valueObjects/users/password.vo.js', () => ({
  PasswordVO: class {
    constructor(value) {
      this.value = value;
    }
  }
}));

const {
  usersService,
} = await import('../../services/users.service.js');

afterEach(() => {
  jest.clearAllMocks();
});

describe('User Service Unit Tests', () => {
  describe('loginService', () => {
    test('Given correct credentials, When login, Then should return a JWT token', async () => {
      // GIVEN
      const mockUser = { id: 1, username: 'test', password_hash: 'hashedpassword' };
      const req = { body: { username: 'test', password: 'password123' } };
      
      loginModelMock.mockResolvedValue([[mockUser]]);
      bcryptCompareMock.mockResolvedValue(true);
      jwtSignMock.mockReturnValue('fake.jwt.token');

      // WHEN
      const token = await usersService.login(req.body);

      // THEN
      expect(token).toBe('fake.jwt.token');
      expect(loginModelMock).toHaveBeenCalledWith('test');
      expect(bcryptCompareMock).toHaveBeenCalledWith('password123', 'hashedpassword');
    });

    test('Given non-existent user, When login, Then should throw error', async () => {
      // GIVEN
      const req = { username: 'nouser', password: 'password123' };
      loginModelMock.mockResolvedValue([[]]);

      // WHEN/THEN
      await expect(usersService.login(req)).rejects.toThrow('Datos Incorrectos');
    });

    test('Given incorrect password, When login, Then should throw error', async () => {
      // GIVEN
      const mockUser = { password_hash: 'hashedpassword' };
      const req = { username: 'testuser', password: 'wrongpassword' };
      loginModelMock.mockResolvedValue([[mockUser]]);
      bcryptCompareMock.mockResolvedValue(false);

      // WHEN/THEN
      await expect(usersService.login(req)).rejects.toThrow('Contraseña incorrecta');
    });
  });

  describe('verifyService', () => {
    test('Given valid token, When verify, Then should return user object', () => {
      // GIVEN
      const token = 'valid.fake.token';
      const mockUser = { id: 1, username: 'testuser' };
      jwtVerifyMock.mockReturnValue(mockUser);

      // WHEN
      const result = usersService.verify({ token });

      // THEN
      expect(result).toEqual(mockUser);
      expect(jwtVerifyMock).toHaveBeenCalledWith(token, expect.any(String));
    });

    test('Given invalid token, When verify, Then should return false', () => {
      // GIVEN
      const token = 'invalid.fake.token';
      jwtVerifyMock.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      // WHEN
      const result = usersService.verify({ token });

      // THEN
      expect(result).toBe(false);
      expect(jwtVerifyMock).toHaveBeenCalled();
    });

    test('When service is called, Then it should call jwt.verify with the token', () => {
      // GIVEN
      const token = 'any.fake.token';
      jwtVerifyMock.mockReturnValue({});

      // WHEN
      usersService.verify({ token });

      // THEN
      expect(jwtVerifyMock).toHaveBeenCalledWith(
        token,
        expect.any(String)
      );
    });
  });

  describe('createUser', () => {
    test('Given valid user data, When create user, Then should create user successfully', async () => {
      // GIVEN
      const mockResult = { insertId: 123 };
      const userData = {
        name: 'Camila',
        lastName: 'Beltran',
        username: 'camilabeltran',
        password: 'password123',
        permissions: ['products-entries', 'products-outs'],
        user_id: 1
      };
      
      bcryptGenSaltMock.mockResolvedValue('salt123');
      bcryptHashMock.mockResolvedValue('hashed_password');
      createModelMock.mockResolvedValue(mockResult);
      addPermissionsToUserModelMock.mockResolvedValue();
      addNotificationServiceMock.mockResolvedValue({ id: 1 });

      // WHEN
      const result = await usersService.createUser(userData);

      // THEN
      expect(result).toEqual(mockResult);
      expect(bcryptGenSaltMock).toHaveBeenCalledWith(10);
      expect(bcryptHashMock).toHaveBeenCalledWith('password123', 'salt123');
      expect(createModelMock).toHaveBeenCalledWith({
        name: 'Camila',
        lastName: 'Beltran',
        username: 'camilabeltran',
        passwordHash: 'hashed_password'
      });
      expect(addPermissionsToUserModelMock).toHaveBeenCalledWith(123, ['products-entries', 'products-outs']);
      expect(addNotificationServiceMock).toHaveBeenCalledWith({
        user_id: 1,
        content: 'Se ha creado un nuevo usuario: camilabeltran',
        type_id: 9,
        permission_id: 6
      });
    });

    test('Given invalid password, When create user, Then should throw error', async () => {
      // GIVEN
      const userData = {
        name: 'Camila',
        lastName: 'Beltran',
        username: 'camilabeltran',
        password: '123', // muy corto
        permissions: ['products-entries'],
        user_id: 1
      };

      // WHEN/THEN
      await expect(usersService.createUser(userData)).rejects.toThrow();
      expect(createModelMock).not.toHaveBeenCalled();
    });

    test('Given database error when creating user, When create user, Then should propagate error', async () => {
      // GIVEN
      const userData = {
        name: 'Camila',
        lastName: 'Beltran',
        username: 'camilabeltran',
        password: 'password123',
        permissions: ['products-entries'],
        user_id: 1
      };
      
      bcryptGenSaltMock.mockResolvedValue('salt123');
      bcryptHashMock.mockResolvedValue('hashed_password');
      createModelMock.mockRejectedValue(new Error('Database error'));

      // WHEN/THEN
      await expect(usersService.createUser(userData)).rejects.toThrow('Database error');
    });

    test('Given error when adding permissions, When create user, Then should propagate error', async () => {
      // GIVEN
      const mockResult = { insertId: 123 };
      const userData = {
        name: 'Camila',
        lastName: 'Beltran',
        username: 'camilabeltran',
        password: 'password123',
        permissions: ['products-entries'],
        user_id: 1
      };
      
      bcryptGenSaltMock.mockResolvedValue('salt123');
      bcryptHashMock.mockResolvedValue('hashed_password');
      createModelMock.mockResolvedValue(mockResult);
      addPermissionsToUserModelMock.mockRejectedValue(new Error('Permission error'));

      // WHEN/THEN
      await expect(usersService.createUser(userData)).rejects.toThrow('Permission error');
    });
  });
});

