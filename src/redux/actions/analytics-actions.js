import * as AnalyticsHelper from '../../helpers/analytics/analytics-helper';
import * as ActionTypes from '../action-types';
import {
  createErrorResponse,
  is404Error,
} from '../../utilities/errorHelper';

const setAnalyticsAvailability = (dispatch, value = true) => {
  return dispatch({
    type: ActionTypes.SET_ANALYTICS_AVAILABILITY,
    payload: value,
  });
};

const setAnalyticsError = (dispatch, value = true) => {
  return dispatch({
    type: ActionTypes.SET_ANALYTICS_ERROR,
    payload: value,
  });
};

/**
 * Fetch clusters from analytics service
 * @returns {Object} { success: boolean, data?: any, error?: Object }
 */
export const fetchClusters = () => async (dispatch) => {
  try {
    const data = await AnalyticsHelper.getClusters();
    dispatch({
      type: ActionTypes.FETCH_CLUSTERS,
      payload: data,
    });
    return { success: true, data };
  } catch (err) {
    if (is404Error(err)) {
      setAnalyticsAvailability(dispatch, false);
      return createErrorResponse(err, 'Analytics service not available');
    } else {
      setAnalyticsError(dispatch, true);
      return createErrorResponse(err, 'Failed to fetch clusters');
    }
  }
};

/**
 * Fetch warning notifications from analytics service
 * @returns {Object} { success: boolean, data?: any, error?: Object }
 */
export const fetchWarningNotifications = () => async (dispatch) => {
  try {
    const data = await AnalyticsHelper.getNotifications('warning');
    dispatch({
      type: ActionTypes.FETCH_WARNING_NOTIFICATIONS,
      payload: data,
    });
    return { success: true, data };
  } catch (err) {
    if (is404Error(err)) {
      setAnalyticsAvailability(dispatch, false);
      return createErrorResponse(err, 'Analytics service not available');
    } else {
      setAnalyticsError(dispatch, true);
      return createErrorResponse(err, 'Failed to fetch warning notifications');
    }
  }
};

/**
 * Fetch error notifications from analytics service
 * @returns {Object} { success: boolean, data?: any, error?: Object }
 */
export const fetchErrorNotifications = () => async (dispatch) => {
  try {
    const data = await AnalyticsHelper.getNotifications('error');
    dispatch({
      type: ActionTypes.FETCH_ERROR_NOTIFICATIONS,
      payload: data,
    });
    return { success: true, data };
  } catch (err) {
    if (is404Error(err)) {
      setAnalyticsAvailability(dispatch, false);
      return createErrorResponse(err, 'Analytics service not available');
    } else {
      setAnalyticsError(dispatch, true);
      return createErrorResponse(err, 'Failed to fetch error notifications');
    }
  }
};

/**
 * Fetch jobs data from analytics service
 * @returns {Object} { success: boolean, data?: any, error?: Object }
 */
export const fetchJobsData = () => async (dispatch) => {
  try {
    const data = await AnalyticsHelper.getJobsData();
    dispatch({
      type: ActionTypes.FETCH_JOBS,
      payload: data,
    });
    return { success: true, data };
  } catch (err) {
    if (is404Error(err)) {
      setAnalyticsAvailability(dispatch, false);
      return createErrorResponse(err, 'Analytics service not available');
    } else {
      setAnalyticsError(dispatch, true);
      return createErrorResponse(err, 'Failed to fetch jobs data');
    }
  }
};
