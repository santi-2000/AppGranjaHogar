import 'dotenv/config';
import { jest } from '@jest/globals';

/**
 * Users Service Test
 * @module UsersServiceTest
 * @description This module contains unit tests for the UsersService.
 *              It uses `jest` for mocking services and assertions.
 * 
 * @author Jared Alejandro Marquez Muñoz Grado
 */

const loginModelMock = jest.fn();
const bcryptCompareMock = jest.fn();
const jwtSignMock = jest.fn();
const jwtVerifyMock = jest.fn();
const getUserByIdMock = jest.fn();
const updatePasswordMock = jest.fn();
const bcryptHashMock = jest.fn();
const bcryptGenSaltMock = jest.fn();

jest.unstable_mockModule('../../models/users.model.js', () => ({
  loginModel: loginModelMock,
  getUserById: getUserByIdMock,
  updatePassword: updatePasswordMock,
  UsersModel: {}, 
}));

jest.unstable_mockModule('bcryptjs', () => ({
  default: { 
    compare: bcryptCompareMock,
    hash: bcryptHashMock,
    genSalt: bcryptGenSaltMock
  }
}));

jest.unstable_mockModule('jsonwebtoken', () => ({
  default: { sign: jwtSignMock, verify: jwtVerifyMock }
}));

import { usersService } from '../../services/users.service.js';

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
      const req = { body: { username: 'nouser', password: 'password123' } };
      loginModelMock.mockResolvedValue([[]]);

      // WHEN/THEN
      await expect(usersService.login(req.body)).rejects.toThrow('Datos Incorrectos');
    });

    test('Given incorrect password, When login, Then should throw error', async () => {
      // GIVEN
      const mockUser = { password_hash: 'hashedpassword' };
      const req = { body: { username: 'testuser', password: 'wrongpassword' } };
      loginModelMock.mockResolvedValue([[mockUser]]);
      bcryptCompareMock.mockResolvedValue(false);

      // WHEN/THEN
      await expect(usersService.login(req.body)).rejects.toThrow('Contraseña incorrecta');
    });
  });

  describe('verifyService', () => {
    test('When service is called, Then it should call jwt.verify with the token', () => {
        // GIVEN
        const token = 'any.fake.token';

        // WHEN
        usersService.verify({ token });

        // THEN
        expect(jwtVerifyMock).toHaveBeenCalledWith(
          token,
          expect.any(String),
          expect.any(Function)
        );
    });
  });

  describe('updatePasswordService', () => {
    test('Given valid password data, When updatePassword, Then should return success message', async () => {
      // GIVEN
      const mockUser = { id: 1, password_hash: 'hashedpassword' };
      const updateData = {
        userId: 1,
        currentPassword: 'currentpass123',
        newPassword: 'newpass123',
        confirmPassword: 'newpass123'
      };
      
      getUserByIdMock.mockResolvedValue(mockUser);
      bcryptCompareMock.mockResolvedValue(true);
      bcryptGenSaltMock.mockResolvedValue('salt123');
      bcryptHashMock.mockResolvedValue('newhashedpassword');
      updatePasswordMock.mockResolvedValue({ affectedRows: 1 });

      // WHEN
      const result = await usersService.updatePassword(updateData);

      // THEN
      expect(result.success).toBe(true);
      expect(result.message).toBe('Contraseña actualizada exitosamente');
      expect(getUserByIdMock).toHaveBeenCalledWith(1);
      expect(bcryptCompareMock).toHaveBeenCalledWith('currentpass123', 'hashedpassword');
      expect(updatePasswordMock).toHaveBeenCalledWith({
        userId: 1,
        newPasswordHash: 'newhashedpassword'
      });
    });

    test('Given incorrect current password, When updatePassword, Then should throw error', async () => {
      // GIVEN
      const mockUser = { id: 1, password_hash: 'hashedpassword' };
      const updateData = {
        userId: 1,
        currentPassword: 'wrongpassword',
        newPassword: 'newpass123',
        confirmPassword: 'newpass123'
      };
      
      getUserByIdMock.mockResolvedValue(mockUser);
      bcryptCompareMock.mockResolvedValue(false);

      // WHEN/THEN
      await expect(usersService.updatePassword(updateData)).rejects.toThrow('La contraseña actual es incorrecta');
      expect(getUserByIdMock).toHaveBeenCalledWith(1);
      expect(bcryptCompareMock).toHaveBeenCalledWith('wrongpassword', 'hashedpassword');
      expect(updatePasswordMock).not.toHaveBeenCalled();
    });

    test('Given non-matching password confirmation, When updatePassword, Then should throw error', async () => {
      // GIVEN
      const mockUser = { id: 1, password_hash: 'hashedpassword' };
      const updateData = {
        userId: 1,
        currentPassword: 'currentpass123',
        newPassword: 'newpass123',
        confirmPassword: 'differentpass123'
      };
      
      getUserByIdMock.mockResolvedValue(mockUser);
      bcryptCompareMock.mockResolvedValue(true);

      // WHEN/THEN
      await expect(usersService.updatePassword(updateData)).rejects.toThrow('La nueva contraseña y la confirmación no coinciden');
      expect(getUserByIdMock).toHaveBeenCalledWith(1);
      expect(bcryptCompareMock).toHaveBeenCalledWith('currentpass123', 'hashedpassword');
      expect(updatePasswordMock).not.toHaveBeenCalled();
    });
  });
});

