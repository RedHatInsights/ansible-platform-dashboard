import * as HubActions from '../../../redux/actions/hub-actions';
import * as HubHelper from '../../../helpers/automation-hub/hub-helper';
import * as ActionTypes from '../../../redux/action-types';

jest.mock('../../../helpers/automation-hub/hub-helper');

describe('Hub Actions', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = jest.fn((action) => action);
    jest.clearAllMocks();
  });

  describe('fetchCollections', () => {
    it('should return success response with data when API call succeeds', async () => {
      const mockData = {
        collections: [
          { id: 1, name: 'collection1' },
          { id: 2, name: 'collection2' },
        ],
      };
      HubHelper.getCollections.mockResolvedValue(mockData);

      const action = HubActions.fetchCollections();
      const result = await action(dispatch);

      expect(result).toEqual({
        success: true,
        data: mockData,
      });
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionTypes.FETCH_COLLECTIONS,
        payload: mockData,
      });
    });

    it('should return error response and set availability to false on 404 error', async () => {
      const error = {
        message: 'Not Found',
        response: { status: 404 },
      };
      HubHelper.getCollections.mockRejectedValue(error);

      const action = HubActions.fetchCollections();
      const result = await action(dispatch);

      expect(result.success).toBe(false);
      expect(result.error.title).toBe('Automation Hub service not available');
      expect(result.error.status).toBe(404);
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionTypes.SET_HUB_AVAILABILITY,
        payload: false,
      });
    });

    it('should return error response and set error flag on non-404 error', async () => {
      const error = {
        message: 'Server Error',
        response: {
          status: 500,
          data: {
            message: 'Internal server error',
          },
        },
      };
      HubHelper.getCollections.mockRejectedValue(error);

      const action = HubActions.fetchCollections();
      const result = await action(dispatch);

      expect(result.success).toBe(false);
      expect(result.error.title).toBe('Failed to fetch collections');
      expect(result.error.status).toBe(500);
      expect(result.error.description).toBe('Internal server error');
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionTypes.SET_HUB_ERROR,
        payload: true,
      });
    });
  });

  describe('fetchCollection', () => {
    it('should return success response with data when API call succeeds', async () => {
      const mockData = {
        id: 1,
        name: 'my-collection',
        version: '1.0.0',
      };
      const offset = 10;
      HubHelper.getCollection.mockResolvedValue(mockData);

      const action = HubActions.fetchCollection(offset);
      const result = await action(dispatch);

      expect(result).toEqual({
        success: true,
        data: mockData,
      });
      expect(HubHelper.getCollection).toHaveBeenCalledWith(offset);
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionTypes.FETCH_COLLECTION,
        payload: mockData,
      });
    });

    it('should return error response and set availability to false on 404 error', async () => {
      const error = {
        status: 404,
        message: 'Collection not found',
      };
      HubHelper.getCollection.mockRejectedValue(error);

      const action = HubActions.fetchCollection(0);
      const result = await action(dispatch);

      expect(result.success).toBe(false);
      expect(result.error.title).toBe('Automation Hub service not available');
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionTypes.SET_HUB_AVAILABILITY,
        payload: false,
      });
    });

    it('should return error response and set error flag on authentication error', async () => {
      const error = {
        message: 'Unauthorized',
        response: {
          status: 401,
          data: {
            errors: [{ detail: 'Authentication credentials were not provided' }],
          },
        },
      };
      HubHelper.getCollection.mockRejectedValue(error);

      const action = HubActions.fetchCollection(5);
      const result = await action(dispatch);

      expect(result.success).toBe(false);
      expect(result.error.title).toBe('Failed to fetch collection');
      expect(result.error.description).toBe('Authentication credentials were not provided');
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionTypes.SET_HUB_ERROR,
        payload: true,
      });
    });
  });

  describe('fetchPartners', () => {
    it('should return success response with data when API call succeeds', async () => {
      const mockData = {
        partners: [
          { id: 1, name: 'Partner A' },
          { id: 2, name: 'Partner B' },
        ],
      };
      HubHelper.getPartners.mockResolvedValue(mockData);

      const action = HubActions.fetchPartners();
      const result = await action(dispatch);

      expect(result).toEqual({
        success: true,
        data: mockData,
      });
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionTypes.FETCH_PARTNERS,
        payload: mockData,
      });
    });

    it('should return error response and set availability to false on 404 error', async () => {
      const error = {
        response: { status: 404 },
        message: 'Endpoint not found',
      };
      HubHelper.getPartners.mockRejectedValue(error);

      const action = HubActions.fetchPartners();
      const result = await action(dispatch);

      expect(result.success).toBe(false);
      expect(result.error.title).toBe('Automation Hub service not available');
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionTypes.SET_HUB_AVAILABILITY,
        payload: false,
      });
    });

    it('should return error response and set error flag on timeout error', async () => {
      const error = {
        message: 'timeout of 30000ms exceeded',
        code: 'ECONNABORTED',
      };
      HubHelper.getPartners.mockRejectedValue(error);

      const action = HubActions.fetchPartners();
      const result = await action(dispatch);

      expect(result.success).toBe(false);
      expect(result.error.title).toBe('Failed to fetch partners');
      expect(result.error.description).toBe('timeout of 30000ms exceeded');
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionTypes.SET_HUB_ERROR,
        payload: true,
      });
    });
  });

  describe('fetchSyncCollections', () => {
    it('should return success response with data when API call succeeds', async () => {
      const mockData = {
        syncedCollections: [
          { id: 1, name: 'synced-collection-1' },
          { id: 2, name: 'synced-collection-2' },
        ],
      };
      const account = 'account123';
      HubHelper.getSyncCollections.mockResolvedValue(mockData);

      const action = HubActions.fetchSyncCollections(account);
      const result = await action(dispatch);

      expect(result).toEqual({
        success: true,
        data: mockData,
      });
      expect(HubHelper.getSyncCollections).toHaveBeenCalledWith(account);
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionTypes.FETCH_SYNC_COLLECTIONS,
        payload: mockData,
      });
    });

    it('should return error response and set availability to false on 404 error', async () => {
      const error = {
        status: 404,
        message: 'Account not found',
      };
      HubHelper.getSyncCollections.mockRejectedValue(error);

      const action = HubActions.fetchSyncCollections('unknown-account');
      const result = await action(dispatch);

      expect(result.success).toBe(false);
      expect(result.error.title).toBe('Automation Hub service not available');
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionTypes.SET_HUB_AVAILABILITY,
        payload: false,
      });
    });

    it('should return error response and set error flag on validation error', async () => {
      const error = {
        message: 'Bad Request',
        response: {
          status: 400,
          data: {
            errors: [
              { message: 'Invalid account format' },
              { detail: 'Account must be alphanumeric' },
            ],
          },
        },
      };
      HubHelper.getSyncCollections.mockRejectedValue(error);

      const action = HubActions.fetchSyncCollections('invalid@account');
      const result = await action(dispatch);

      expect(result.success).toBe(false);
      expect(result.error.title).toBe('Failed to fetch sync collections');
      expect(result.error.description).toContain('Invalid account format');
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionTypes.SET_HUB_ERROR,
        payload: true,
      });
    });

    it('should handle network errors', async () => {
      const error = {
        message: 'Network Error',
      };
      HubHelper.getSyncCollections.mockRejectedValue(error);

      const action = HubActions.fetchSyncCollections('account123');
      const result = await action(dispatch);

      expect(result.success).toBe(false);
      expect(result.error.title).toBe('Failed to fetch sync collections');
      expect(result.error.description).toBe('Network Error');
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionTypes.SET_HUB_ERROR,
        payload: true,
      });
    });
  });
});
