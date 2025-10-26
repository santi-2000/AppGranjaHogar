import 'dotenv/config';
import { jest } from '@jest/globals';

const getAllNotificationsMock = jest.fn();
const getNotificationByIdMock = jest.fn();
const createNotificationMock = jest.fn();
const deleteNotificationMock = jest.fn();

jest.unstable_mockModule('../../models/notifications.model.js', () => ({
  getAllNotificationsModel: getAllNotificationsMock,
  getNotificationByIdModel: getNotificationByIdMock,
  createNotificationModel: createNotificationMock,
  deleteNotificationModel: deleteNotificationMock,
}));

const {
  getAllNotificationsService,
  getNotificationByIdService,
  createNotificationService,
  deleteNotificationService,
} = await import('../../services/notifications.service.js');

afterEach(() => {
  jest.clearAllMocks();
});

describe('Notifications Service Unit Tests', () => {
  // GET
  describe('getAllNotificationsService', () => {
    test('Given notifications exist, When service called, Then should return list', async () => {
      // GIVEN
      const mockData = [
        { id: 1, title: 'Stock bajo', message: 'Producto X casi agotado' },
      ];
      getAllNotificationsMock.mockResolvedValue(mockData);

      // WHEN
      const result = await getAllNotificationsService();

      // THEN
      expect(result).toEqual(mockData);
      expect(getAllNotificationsMock).toHaveBeenCalledTimes(1);
    });

    test('Given DB error, When service called, Then should throw error', async () => {
      getAllNotificationsMock.mockRejectedValue(new Error('DB error'));

      await expect(getAllNotificationsService()).rejects.toThrow('DB error');
    });
  });

  // GET BY ID
  describe('getNotificationByIdService', () => {
    test('Given valid ID, When found, Then should return notification', async () => {
      const mockNotification = { id: 5, title: 'Aviso general' };
      getNotificationByIdMock.mockResolvedValue(mockNotification);

      const result = await getNotificationByIdService(5);

      expect(result).toEqual(mockNotification);
      expect(getNotificationByIdMock).toHaveBeenCalledWith(5);
    });

    test('Given invalid ID, When not found, Then should return null', async () => {
      getNotificationByIdMock.mockResolvedValue(null);

      const result = await getNotificationByIdService(99);

      expect(result).toBeNull();
    });

    test('Given DB error, When called, Then should throw', async () => {
      getNotificationByIdMock.mockRejectedValue(new Error('DB fail'));

      await expect(getNotificationByIdService(1)).rejects.toThrow('DB fail');
    });
  });

  // CREATE
  describe('createNotificationService', () => {
    test('Given valid data, When created, Then should return new notification', async () => {
      const mockNew = { id: 10, title: 'Nueva alerta', message: 'Mensaje importante' };
      createNotificationMock.mockResolvedValue(mockNew);

      const result = await createNotificationService('Nueva alerta', 'Mensaje importante');

      expect(result).toEqual(mockNew);
      expect(createNotificationMock).toHaveBeenCalledWith('Nueva alerta', 'Mensaje importante');
    });

    test('Given DB error, When insert fails, Then should throw', async () => {
      createNotificationMock.mockRejectedValue(new Error('Insert fail'));

      await expect(
        createNotificationService('X', 'Y')
      ).rejects.toThrow('Insert fail');
    });
  });

  // DELETE
  describe('deleteNotificationService', () => {
    test('Given valid ID, When deleted, Then should return true', async () => {
      deleteNotificationMock.mockResolvedValue(true);

      const result = await deleteNotificationService(1);

      expect(result).toBe(true);
      expect(deleteNotificationMock).toHaveBeenCalledWith(1);
    });

    test('Given DB error, When delete fails, Then should throw', async () => {
      deleteNotificationMock.mockRejectedValue(new Error('Delete fail'));

      await expect(deleteNotificationService(1)).rejects.toThrow('Delete fail');
    });
  });
});
