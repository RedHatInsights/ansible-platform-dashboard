/**
 * Notifications Shim for PF6 Migration
 * =====================================
 *
 * The @redhat-cloud-services/frontend-components-notifications package changed
 * significantly in v6. The Redux-based API (/redux export) was removed.
 *
 * This shim provides placeholder implementations that log warnings but allow
 * the app to run. Notifications will not actually display until properly migrated.
 *
 * MIGRATION:
 * - Old: import { addNotification } from '@redhat-cloud-services/frontend-components-notifications/redux'
 * - New: Use the store-based notifications API from frontend-components-notifications v6
 *
 * FILES USING THIS SHIM:
 * - src/utilities/store.js
 *
 * @see https://github.com/RedHatInsights/frontend-components/tree/master/packages/notifications
 */

export const addNotification = (notification) => {
  // eslint-disable-next-line no-console
  console.warn('addNotification called but not implemented for PF6', notification);
  return { type: 'ADD_NOTIFICATION', payload: notification };
};

export const removeNotification = (id) => {
  // eslint-disable-next-line no-console
  console.warn('removeNotification called but not implemented for PF6', id);
  return { type: 'REMOVE_NOTIFICATION', payload: id };
};

export const notificationsReducer = (state = { notifications: [] }, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter((n) => n.id !== action.payload),
      };
    default:
      return state;
  }
};

/**
 * Notifications Middleware Shim
 *
 * The notificationsMiddleware was removed from frontend-components-notifications v6.
 * This shim provides a no-op middleware that allows the app to run.
 */
export const notificationsMiddleware = (options = {}) => {
  // eslint-disable-next-line no-console
  console.warn('notificationsMiddleware is shimmed for PF6 migration', options);
  return () => (next) => (action) => {
    return next(action);
  };
};

export default notificationsMiddleware;
