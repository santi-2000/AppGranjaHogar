import { jest } from '@jest/globals';
import { PermissionVO } from '../../valueObjects/permissions/permission.vo.js';
import { UserPermissionVO } from '../../valueObjects/permissions/userPermission.vo.js';

const getAllPermissionsModelMock = jest.fn();
const getUserPermissionsModelMock = jest.fn();
const deleteUserPermissionsModelMock = jest.fn();
const insertUserPermissionsModelMock = jest.fn();

jest.unstable_mockModule('../../models/permissions.model.js', () => ({
  getAllPermissionsModel: getAllPermissionsModelMock,
  getUserPermissionsModel: getUserPermissionsModelMock,
  deleteUserPermissionsModel: deleteUserPermissionsModelMock,
  insertUserPermissionsModel: insertUserPermissionsModelMock,
}));

const { getAllPermissionsService, getUserPermissionsService, updateUserPermissionsService } = await import('../../services/permissions.service.js');

afterEach(() => {
  jest.clearAllMocks();
});

describe('Permission Service', () => {
  describe('getAllPermissionsService', () => {
    test('Given permissions exist When get all Then returns array of PermissionVO', async () => {
      // GIVEN
      const mockDbPermissions = [
        { id: 1, permission: 'Entrada de productos' },
        { id: 2, permission: 'Salidas de productos' },
        { id: 3, permission: 'Generar reportes' },
      ];
      getAllPermissionsModelMock.mockResolvedValue(mockDbPermissions);

      // WHEN
      const result = await getAllPermissionsService();

      // THEN
      expect(result).toHaveLength(3);
      expect(result[0]).toBeInstanceOf(PermissionVO);
      expect(result[0].permission).toBe('Entrada de productos');
      expect(getAllPermissionsModelMock).toHaveBeenCalled();
    });

    test('Given no permissions When get all Then returns empty array', async () => {
      // GIVEN
      getAllPermissionsModelMock.mockResolvedValue([]);

      // WHEN
      const result = await getAllPermissionsService();

      // THEN
      expect(result).toEqual([]);
    });

    test('Given invalid data When get all Then returns empty array', async () => {
      // GIVEN
      getAllPermissionsModelMock.mockResolvedValue(null);

      // WHEN
      const result = await getAllPermissionsService();

      // THEN
      expect(result).toEqual([]);
    });
  });

  describe('getUserPermissionsService', () => {
    test('Given user with permissions When get Then returns UserPermissionVO', async () => {
      // GIVEN
      const user_id = 1;
      const mockDbPermissions = [
        { id: 1, permission: 'Entrada de productos' },
        { id: 2, permission: 'Salidas de productos' },
      ];
      getUserPermissionsModelMock.mockResolvedValue(mockDbPermissions);

      // WHEN
      const result = await getUserPermissionsService(user_id);

      // THEN
      expect(result).toBeInstanceOf(UserPermissionVO);
      expect(result.user_id).toBe(1);
      expect(result.permissions).toHaveLength(2);
      expect(result.permissions[0]).toBeInstanceOf(PermissionVO);
      expect(result.permission_count).toBe(2);
      expect(getUserPermissionsModelMock).toHaveBeenCalledWith(user_id);
    });

    test('Given user without permissions When get Then returns empty permissions', async () => {
      // GIVEN
      const user_id = 3;
      getUserPermissionsModelMock.mockResolvedValue([]);

      // WHEN
      const result = await getUserPermissionsService(user_id);

      // THEN
      expect(result).toBeInstanceOf(UserPermissionVO);
      expect(result.user_id).toBe(3);
      expect(result.permissions).toHaveLength(0);
      expect(result.permission_count).toBe(0);
    });

    test('Given null result When get Then returns empty permissions', async () => {
      // GIVEN
      const user_id = 999;
      getUserPermissionsModelMock.mockResolvedValue(null);

      // WHEN
      const result = await getUserPermissionsService(user_id);

      // THEN
      expect(result).toEqual([]);
    });
  });

  describe('updateUserPermissionsService', () => {
    test('Given valid data When update Then returns success', async () => {
      // GIVEN
      const user_id = 1;
      const permission_ids = [1, 2, 3];
      deleteUserPermissionsModelMock.mockResolvedValue([{ affectedRows: 1 }]);
      insertUserPermissionsModelMock.mockResolvedValue([{ affectedRows: 3 }]);

      // WHEN
      const result = await updateUserPermissionsService(user_id, permission_ids);

      // THEN
      expect(result.success).toBe(true);
      expect(result.message).toBe('Permisos actualizados exitosamente');
      expect(deleteUserPermissionsModelMock).toHaveBeenCalledWith(user_id);
      expect(insertUserPermissionsModelMock).toHaveBeenCalledWith(user_id, permission_ids);
    });

    test('Given empty array When update Then returns success', async () => {
      // GIVEN
      const user_id = 1;
      const permission_ids = [];
      deleteUserPermissionsModelMock.mockResolvedValue([{ affectedRows: 1 }]);

      // WHEN
      const result = await updateUserPermissionsService(user_id, permission_ids);

      // THEN
      expect(result.success).toBe(true);
      expect(result.message).toBe('Permisos actualizados exitosamente');
      expect(deleteUserPermissionsModelMock).toHaveBeenCalledWith(user_id);
      expect(insertUserPermissionsModelMock).not.toHaveBeenCalled();
    });

    test('Given null permission_ids When update Then returns success', async () => {
      // GIVEN
      const user_id = 1;
      const permission_ids = null;
      deleteUserPermissionsModelMock.mockResolvedValue([{ affectedRows: 1 }]);

      // WHEN
      const result = await updateUserPermissionsService(user_id, permission_ids);

      // THEN
      expect(result.success).toBe(true);
      expect(deleteUserPermissionsModelMock).toHaveBeenCalledWith(user_id);
      expect(insertUserPermissionsModelMock).not.toHaveBeenCalled();
    });
  });
});