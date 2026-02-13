import * as AnalyticsActions from '../../../redux/actions/analytics-actions';
import * as AnalyticsHelper from '../../../helpers/analytics/analytics-helper';
import * as ActionTypes from '../../../redux/action-types';

jest.mock('../../../helpers/analytics/analytics-helper');

describe('Analytics Actions', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = jest.fn((action) => action);
    jest.clearAllMocks();
  });

  describe('fetchClusters', () => {
    it('should return success response with data when API call succeeds', async () => {
      const mockData = { clusters: [{ id: 1, name: 'cluster1' }] };
      AnalyticsHelper.getClusters.mockResolvedValue(mockData);

      const action = AnalyticsActions.fetchClusters();
      const result = await action(dispatch);

      expect(result).toEqual({
        success: true,
        data: mockData,
      });
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionTypes.FETCH_CLUSTERS,
        payload: mockData,
      });
    });

    it('should return error response and set availability to false on 404 error', async () => {
      const error = {
        message: 'Not Found',
        response: { status: 404 },
      };
      AnalyticsHelper.getClusters.mockRejectedValue(error);

      const action = AnalyticsActions.fetchClusters();
      const result = await action(dispatch);

      expect(result.success).toBe(false);
      expect(result.error.title).toBe('Analytics service not available');
      expect(result.error.status).toBe(404);
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionTypes.SET_ANALYTICS_AVAILABILITY,
        payload: false,
      });
    });

    it('should return error response and set error flag on non-404 error', async () => {
      const error = {
        message: 'Server Error',
        response: { status: 500 },
      };
      AnalyticsHelper.getClusters.mockRejectedValue(error);

      const action = AnalyticsActions.fetchClusters();
      const result = await action(dispatch);

      expect(result.success).toBe(false);
      expect(result.error.title).toBe('Failed to fetch clusters');
      expect(result.error.status).toBe(500);
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionTypes.SET_ANALYTICS_ERROR,
        payload: true,
      });
    });
  });

  describe('fetchWarningNotifications', () => {
    it('should return success response with data when API call succeeds', async () => {
      const mockData = { notifications: [{ id: 1, type: 'warning' }] };
      AnalyticsHelper.getNotifications.mockResolvedValue(mockData);

      const action = AnalyticsActions.fetchWarningNotifications();
      const result = await action(dispatch);

      expect(result).toEqual({
        success: true,
        data: mockData,
      });
      expect(AnalyticsHelper.getNotifications).toHaveBeenCalledWith('warning');
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionTypes.FETCH_WARNING_NOTIFICATIONS,
        payload: mockData,
      });
    });

    it('should return error response and set availability to false on 404 error', async () => {
      const error = {
        message: 'Not Found',
        status: 404,
      };
      AnalyticsHelper.getNotifications.mockRejectedValue(error);

      const action = AnalyticsActions.fetchWarningNotifications();
      const result = await action(dispatch);

      expect(result.success).toBe(false);
      expect(result.error.title).toBe('Analytics service not available');
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionTypes.SET_ANALYTICS_AVAILABILITY,
        payload: false,
      });
    });

    it('should return error response and set error flag on non-404 error', async () => {
      const error = {
        message: 'Server Error',
        response: {
          status: 503,
          data: { message: 'Service unavailable' },
        },
      };
      AnalyticsHelper.getNotifications.mockRejectedValue(error);

      const action = AnalyticsActions.fetchWarningNotifications();
      const result = await action(dispatch);

      expect(result.success).toBe(false);
      expect(result.error.title).toBe('Failed to fetch warning notifications');
      expect(result.error.description).toBe('Service unavailable');
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionTypes.SET_ANALYTICS_ERROR,
        payload: true,
      });
    });
  });

  describe('fetchErrorNotifications', () => {
    it('should return success response with data when API call succeeds', async () => {
      const mockData = { notifications: [{ id: 2, type: 'error' }] };
      AnalyticsHelper.getNotifications.mockResolvedValue(mockData);

      const action = AnalyticsActions.fetchErrorNotifications();
      const result = await action(dispatch);

      expect(result).toEqual({
        success: true,
        data: mockData,
      });
      expect(AnalyticsHelper.getNotifications).toHaveBeenCalledWith('error');
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionTypes.FETCH_ERROR_NOTIFICATIONS,
        payload: mockData,
      });
    });

    it('should return error response and set availability to false on 404 error', async () => {
      const error = {
        response: { status: 404 },
        message: 'Not Found',
      };
      AnalyticsHelper.getNotifications.mockRejectedValue(error);

      const action = AnalyticsActions.fetchErrorNotifications();
      const result = await action(dispatch);

      expect(result.success).toBe(false);
      expect(result.error.title).toBe('Analytics service not available');
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionTypes.SET_ANALYTICS_AVAILABILITY,
        payload: false,
      });
    });

    it('should return error response and set error flag on network error', async () => {
      const error = {
        message: 'Network Error',
      };
      AnalyticsHelper.getNotifications.mockRejectedValue(error);

      const action = AnalyticsActions.fetchErrorNotifications();
      const result = await action(dispatch);

      expect(result.success).toBe(false);
      expect(result.error.title).toBe('Failed to fetch error notifications');
      expect(result.error.description).toBe('Network Error');
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionTypes.SET_ANALYTICS_ERROR,
        payload: true,
      });
    });
  });

  describe('fetchJobsData', () => {
    it('should return success response with data when API call succeeds', async () => {
      const mockData = {
        jobs: [
          { id: 1, name: 'job1', status: 'success' },
          { id: 2, name: 'job2', status: 'failed' },
        ],
      };
      AnalyticsHelper.getJobsData.mockResolvedValue(mockData);

      const action = AnalyticsActions.fetchJobsData();
      const result = await action(dispatch);

      expect(result).toEqual({
        success: true,
        data: mockData,
      });
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionTypes.FETCH_JOBS,
        payload: mockData,
      });
    });

    it('should return error response and set availability to false on 404 error', async () => {
      const error = {
        status: 404,
        message: 'Endpoint not found',
      };
      AnalyticsHelper.getJobsData.mockRejectedValue(error);

      const action = AnalyticsActions.fetchJobsData();
      const result = await action(dispatch);

      expect(result.success).toBe(false);
      expect(result.error.title).toBe('Analytics service not available');
      expect(result.error.status).toBe(404);
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionTypes.SET_ANALYTICS_AVAILABILITY,
        payload: false,
      });
    });

    it('should return error response and set error flag on server error', async () => {
      const error = {
        message: 'Internal Server Error',
        response: {
          status: 500,
          data: {
            errors: [
              { detail: 'Database connection failed' },
            ],
          },
        },
      };
      AnalyticsHelper.getJobsData.mockRejectedValue(error);

      const action = AnalyticsActions.fetchJobsData();
      const result = await action(dispatch);

      expect(result.success).toBe(false);
      expect(result.error.title).toBe('Failed to fetch jobs data');
      expect(result.error.description).toBe('Database connection failed');
      expect(result.error.status).toBe(500);
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionTypes.SET_ANALYTICS_ERROR,
        payload: true,
      });
    });

    it('should handle complex error responses', async () => {
      const error = {
        message: 'Request failed',
        response: {
          status: 400,
          data: {
            errors: [
              { message: 'Invalid parameter: cluster_id' },
              { message: 'Missing required field: organization' },
            ],
          },
        },
      };
      AnalyticsHelper.getJobsData.mockRejectedValue(error);

      const action = AnalyticsActions.fetchJobsData();
      const result = await action(dispatch);

      expect(result.success).toBe(false);
      expect(result.error.title).toBe('Failed to fetch jobs data');
      expect(result.error.description).toContain('Invalid parameter: cluster_id');
      expect(result.error.description).toContain('Missing required field: organization');
    });
  });
});
