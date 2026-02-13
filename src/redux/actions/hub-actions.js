import * as HubHelper from '../../helpers/automation-hub/hub-helper';
import * as ActionTypes from '../action-types';
import {
  createErrorResponse,
  is404Error,
} from '../../utilities/errorHelper';

const setHubAvailability = (dispatch, value = true) => {
  return dispatch({
    type: ActionTypes.SET_HUB_AVAILABILITY,
    payload: value,
  });
};

const setHubError = (dispatch, value = true) => {
  return dispatch({
    type: ActionTypes.SET_HUB_ERROR,
    payload: value,
  });
};

/**
 * Fetch collections from automation hub
 * @returns {Object} { success: boolean, data?: any, error?: Object }
 */
export const fetchCollections = () => async (dispatch) => {
  try {
    const data = await HubHelper.getCollections();
    dispatch({
      type: ActionTypes.FETCH_COLLECTIONS,
      payload: data,
    });
    return { success: true, data };
  } catch (err) {
    if (is404Error(err)) {
      setHubAvailability(dispatch, false);
      return createErrorResponse(err, 'Automation Hub service not available');
    } else {
      setHubError(dispatch, true);
      return createErrorResponse(err, 'Failed to fetch collections');
    }
  }
};

/**
 * Fetch a specific collection from automation hub
 * @param {number} offset - Pagination offset
 * @returns {Object} { success: boolean, data?: any, error?: Object }
 */
export const fetchCollection = (offset) => async (dispatch) => {
  try {
    const data = await HubHelper.getCollection(offset);
    dispatch({
      type: ActionTypes.FETCH_COLLECTION,
      payload: data,
    });
    return { success: true, data };
  } catch (err) {
    if (is404Error(err)) {
      setHubAvailability(dispatch, false);
      return createErrorResponse(err, 'Automation Hub service not available');
    } else {
      setHubError(dispatch, true);
      return createErrorResponse(err, 'Failed to fetch collection');
    }
  }
};

/**
 * Fetch partners from automation hub
 * @returns {Object} { success: boolean, data?: any, error?: Object }
 */
export const fetchPartners = () => async (dispatch) => {
  try {
    const data = await HubHelper.getPartners();
    dispatch({
      type: ActionTypes.FETCH_PARTNERS,
      payload: data,
    });
    return { success: true, data };
  } catch (err) {
    if (is404Error(err)) {
      setHubAvailability(dispatch, false);
      return createErrorResponse(err, 'Automation Hub service not available');
    } else {
      setHubError(dispatch, true);
      return createErrorResponse(err, 'Failed to fetch partners');
    }
  }
};

/**
 * Fetch synced collections from automation hub
 * @param {string} account - Account identifier
 * @returns {Object} { success: boolean, data?: any, error?: Object }
 */
export const fetchSyncCollections = (account) => async (dispatch) => {
  try {
    const data = await HubHelper.getSyncCollections(account);
    dispatch({
      type: ActionTypes.FETCH_SYNC_COLLECTIONS,
      payload: data,
    });
    return { success: true, data };
  } catch (err) {
    if (is404Error(err)) {
      setHubAvailability(dispatch, false);
      return createErrorResponse(err, 'Automation Hub service not available');
    } else {
      setHubError(dispatch, true);
      return createErrorResponse(err, 'Failed to fetch sync collections');
    }
  }
};
