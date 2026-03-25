import { defaultSettings } from '../../helpers/shared/pagination';
import {
  FETCH_CLUSTERS,
  FETCH_ERROR_NOTIFICATIONS,
  FETCH_JOBS,
  FETCH_WARNING_NOTIFICATIONS,
  SET_ANALYTICS_AVAILABILITY,
  SET_ANALYTICS_ERROR,
  SET_ANALYTICS_LOADING_STATE,
} from '../action-types';

// Initial State
export const analyticsInitialState = {
  isLoading: false,
  isAnalyticsAvailable: true,
  isError: false,
  clusters: {
    data: [],
    meta: { ...defaultSettings },
  },
  errorNotifications: {
    notifications: [],
    meta: { ...defaultSettings },
  },
  warningNotifications: {
    notifications: [],
    meta: { ...defaultSettings },
  },
  jobsData: {
    data: [],
    meta: { ...defaultSettings },
  },
};

const setLoadingState = (state, payload = true) => ({
  ...state,
  isLoading: payload,
});

const setAvailabilityState = (state, { payload = true }) => ({
  ...state,
  isAnalyticsAvailable: payload,
});

const setErrorState = (state, { payload = true }) => ({
  ...state,
  isError: payload,
});

const setClusters = (state, payload) => ({
  ...state,
  clusters: payload,
});

const setErrorNotifications = (state, payload) => ({
  ...state,
  errorNotifications: payload,
});

const setWarningNotifications = (state, payload) => ({
  ...state,
  warningNotifications: payload,
});

const setJobsData = (state, payload) => ({
  ...state,
  jobsData: payload,
});

export default {
  [SET_ANALYTICS_LOADING_STATE]: setLoadingState,
  [SET_ANALYTICS_AVAILABILITY]: setAvailabilityState,
  [SET_ANALYTICS_ERROR]: setErrorState,
  [FETCH_CLUSTERS]: setClusters,
  [FETCH_ERROR_NOTIFICATIONS]: setErrorNotifications,
  [FETCH_WARNING_NOTIFICATIONS]: setWarningNotifications,
  [FETCH_JOBS]: setJobsData,
};
