import request from 'supertest';
import { jest } from '@jest/globals';

const permissionServiceMock = {
  getAllPermissionsService: jest.fn(),
  getUserPermissionsService: jest.fn(),
  updateUserPermissionsService: jest.fn(),
};

jest.unstable_mockModule('../../services/permissions.service.js', () => permissionServiceMock);

import { PermissionVO } from '../../valueObjects/permissions/permission.vo.js';
import { UserPermissionVO } from '../../valueObjects/permissions/userPermission.vo.js';

import app from '../../app.js';
const { getAllPermissionsService, getUserPermissionsService, updateUserPermissionsService } = await import('../../services/permissions.service.js');

describe("Permission Controller unit tests", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('Get All Permissions Endpoint Test', () => {
    test('Given request When get all permissions Then status 200', async () => {
      const mockPermissions = [
        new PermissionVO({ id: 1, permission: 'Entrada de productos' }),
        new PermissionVO({ id: 2, permission: 'Salidas de productos' }),
        new PermissionVO({ id: 3, permission: 'Generar reportes' }),
      ];

      getAllPermissionsService.mockResolvedValue(mockPermissions);

      await request(app)
        .get('/v1/permissions')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveLength(3);
          expect(res.body[0].permission).toBe('Entrada de productos');
        });
    });

    test('Given error When get all permissions Then status 500', async () => {
      getAllPermissionsService.mockRejectedValue(new Error('Error al obtener permisos'));

      await request(app)
        .get('/v1/permissions')
        .expect(500);
    });
  });

  describe('Get User Permissions Endpoint Test', () => {
    test('Given valid user ID When get permissions Then status 200', async () => {
      const mockUserPermissions = new UserPermissionVO(
        1,
        [
          new PermissionVO({ id: 1, permission: 'Entrada de productos' }),
          new PermissionVO({ id: 2, permission: 'Salidas de productos' }),
        ]
      );

      getUserPermissionsService.mockResolvedValue(mockUserPermissions);

      await request(app)
        .get('/v1/permissions/user/1')
        .expect(200)
        .expect((res) => {
          expect(res.body.user_id).toBe(1);
          expect(res.body.permissions).toHaveLength(2);
          expect(res.body.permission_count).toBe(2);
        });
    });

    test('Given invalid user ID When get permissions Then error 400', async () => {
      await request(app)
        .get('/v1/permissions/user/invalid')
        .expect(400);
    });

    test('Given user with no permissions When get permissions Then empty array', async () => {
      const mockUserPermissions = new UserPermissionVO(3, []);

      getUserPermissionsService.mockResolvedValue(mockUserPermissions);

      await request(app)
        .get('/v1/permissions/user/3')
        .expect(200)
        .expect((res) => {
          expect(res.body.user_id).toBe(3);
          expect(res.body.permissions).toHaveLength(0);
          expect(res.body.permission_count).toBe(0);
        });
    });

    test('Given error When get user permissions Then status 500', async () => {
      getUserPermissionsService.mockRejectedValue(new Error('Error al obtener permisos del usuario'));

      await request(app)
        .get('/v1/permissions/user/1')
        .expect(500);
    });
  });

  describe('Update User Permissions Endpoint Test', () => {
    test('Given valid data When update permissions Then status 200', async () => {
      updateUserPermissionsService.mockResolvedValue({
        success: true,
        message: 'Permisos actualizados exitosamente',
      });

      await request(app)
        .put('/v1/permissions/user/1')
        .send({
          permission_ids: [1, 2, 3],
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.message).toBe('Permisos actualizados exitosamente');
        });
    });

    test('Given empty array When update permissions Then status 200', async () => {
      updateUserPermissionsService.mockResolvedValue({
        success: true,
        message: 'Permisos actualizados exitosamente',
      });

      await request(app)
        .put('/v1/permissions/user/1')
        .send({
          permission_ids: [],
        })
        .expect(200);
    });

    test('Given invalid user ID When update permissions Then error 400', async () => {
      await request(app)
        .put('/v1/permissions/user/invalid')
        .send({
          permission_ids: [1, 2],
        })
        .expect(400);
    });

    test('Given invalid permission_ids format When update Then error 400', async () => {
      await request(app)
        .put('/v1/permissions/user/1')
        .send({
          permission_ids: 'not-an-array',
        })
        .expect(400);
    });

    test('Given non-numeric permission IDs When update Then error 400', async () => {
      await request(app)
        .put('/v1/permissions/user/1')
        .send({
          permission_ids: [1, 'invalid', 3],
        })
        .expect(400);
    });

    test('Given missing body When update permissions Then error 400', async () => {
      await request(app)
        .put('/v1/permissions/user/1')
        .send({})
        .expect(400);
    });

    test('Given error When update permissions Then status 500', async () => {
      updateUserPermissionsService.mockRejectedValue(new Error('Error al actualizar permisos'));

      await request(app)
        .put('/v1/permissions/user/1')
        .send({
          permission_ids: [1, 2],
        })
        .expect(500);
    });
  });
});