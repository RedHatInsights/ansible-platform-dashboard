/**
 * Extracts error message from various API error response formats.
 * This replicates the behavior of the old notificationsMiddleware
 * which looked for errors in multiple locations.
 *
 * @param {Error} error - The error object from the API call
 * @returns {Object} Object with title and description
 */
export const extractErrorInfo = (error) => {
  // Default error info
  let title = 'An error occurred';
  let description = 'An unexpected error occurred. Please try again.';

  if (!error) {
    return { title, description };
  }

  // Try to extract error title from common locations
  const titlePaths = ['errors', 'message', 'statusText'];
  for (const path of titlePaths) {
    if (error[path]) {
      title = error[path];
      break;
    }
  }

  // Try to extract detailed error description from various response formats
  const descriptionPaths = [
    // Try data.errors[0].detail first (most specific)
    () => error.response?.data?.errors?.[0]?.detail,
    () => error.data?.errors?.[0]?.detail,

    // Try data.errors (array of errors)
    () => {
      const errors = error.response?.data?.errors || error.data?.errors;
      if (Array.isArray(errors) && errors.length > 0) {
        return errors.map(e => e.message || e.detail || e).join(', ');
      }

      return null;
    },

    // Try data.error (single error object)
    () => error.response?.data?.error,
    () => error.data?.error,

    // Try data.message
    () => error.response?.data?.message,
    () => error.data?.message,

    // Try response.body.errors
    () => {
      const errors = error.response?.body?.errors;
      if (Array.isArray(errors) && errors.length > 0) {
        return errors.map(e => e.message || e.detail || e).join(', ');
      }

      return null;
    },

    // Try data directly (might be a string)
    () => {
      const data = error.response?.data || error.data;
      if (typeof data === 'string') {
        return data;
      }

      return null;
    },

    // Try errorMessage
    () => error.errorMessage,

    // Try error.message (standard Error property)
    () => error.message,

    // Try stack as last resort
    () => error.stack,
  ];

  // Find the first non-null description
  for (const pathFn of descriptionPaths) {
    try {
      const value = pathFn();
      if (value) {
        description = typeof value === 'string' ? value : JSON.stringify(value);
        break;
      }
    } catch (e) {
      // Continue to next path if this one fails
      continue;
    }
  }

  // Clean up description - remove stack traces if description is too long
  if (description.length > 500 && description.includes('\n')) {
    description = description.split('\n')[0] + '...';
  }

  return {
    title: typeof title === 'string' ? title : 'Error',
    description: description || 'An unexpected error occurred',
  };
};

/**
 * Creates a standardized error response object for actions
 *
 * @param {Error} error - The error object
 * @param {string} defaultTitle - Default title if extraction fails
 * @returns {Object} Standardized error response
 */
export const createErrorResponse = (error, defaultTitle = 'Operation failed') => {
  const errorInfo = extractErrorInfo(error);

  return {
    success: false,
    error: {
      title: defaultTitle,
      description: errorInfo.description,
      status: error.response?.status || error.status,
      originalError: error,
    },
  };
};

/**
 * Helper to determine if error is a 404
 *
 * @param {Error} error - The error object
 * @returns {boolean} True if 404 error
 */
export const is404Error = (error) => {
  return error?.status === 404 || error?.response?.status === 404;
};

/**
 * Helper to determine if error is a network error
 *
 * @param {Error} error - The error object
 * @returns {boolean} True if network error
 */
export const isNetworkError = (error) => {
  return !error.response && error.message === 'Network Error';
};
