import 'dotenv/config';
import { jest } from '@jest/globals';

const loginModelMock = jest.fn();
const bcryptCompareMock = jest.fn();
const jwtSignMock = jest.fn();
const jwtVerifyMock = jest.fn();

jest.unstable_mockModule('../../models/users.model.js', () => ({
  loginModel: loginModelMock,
  UsersModel: {}, 
}));

jest.unstable_mockModule('bcryptjs', () => ({
  default: { compare: bcryptCompareMock }
}));

jest.unstable_mockModule('jsonwebtoken', () => ({
  default: { sign: jwtSignMock, verify: jwtVerifyMock }
}));

const {
  loginService,
  verifyService,
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
      const token = await loginService(req);

      // THEN
      expect(token).toBe('fake.jwt.token');
      expect(loginModelMock).toHaveBeenCalledWith('test');
      expect(bcryptCompareMock).toHaveBeenCalledWith('password123', 'hashedpassword');
    });

    test('Given non-existent user, When login, Then should throw error', async () => {
      // GIVEN
      const req = { body: { username: 'nouser', password: 'password123' } };
      loginModelMock.mockResolvedValue([[]]);

      // WHEN/THEN
      await expect(loginService(req)).rejects.toThrow('Datos Incorrectos');
    });

    test('Given incorrect password, When login, Then should throw error', async () => {
      // GIVEN
      const mockUser = { password_hash: 'hashedpassword' };
      const req = { body: { username: 'testuser', password: 'wrongpassword' } };
      loginModelMock.mockResolvedValue([[mockUser]]);
      bcryptCompareMock.mockResolvedValue(false);

      // WHEN/THEN
      await expect(loginService(req)).rejects.toThrow('Contraseña incorrecta');
    });
  });

  describe('verifyService', () => {
    test('When service is called, Then it should call jwt.verify with the token', () => {
        // GIVEN
        const token = 'any.fake.token';

        // WHEN
        verifyService(token);

        // THEN
        expect(jwtVerifyMock).toHaveBeenCalledWith(
          token,
          expect.any(String),
          expect.any(Function)
        );
    });
  });
});

