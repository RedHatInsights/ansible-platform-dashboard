import {
  extractErrorInfo,
  createErrorResponse,
  is404Error,
  isNetworkError,
} from '../../utilities/errorHelper';

describe('errorHelper', () => {
  describe('extractErrorInfo', () => {
    it('should return default error info when error is null', () => {
      const result = extractErrorInfo(null);
      expect(result).toEqual({
        title: 'An error occurred',
        description: 'An unexpected error occurred. Please try again.',
      });
    });

    it('should extract error from errors property', () => {
      const error = { errors: 'Custom error title' };
      const result = extractErrorInfo(error);
      expect(result.title).toBe('Custom error title');
    });

    it('should extract error from message property', () => {
      const error = { message: 'Error message' };
      const result = extractErrorInfo(error);
      expect(result.title).toBe('Error message');
    });

    it('should extract error from statusText property', () => {
      const error = { statusText: 'Not Found' };
      const result = extractErrorInfo(error);
      expect(result.title).toBe('Not Found');
    });

    it('should extract description from response.data.errors[0].detail', () => {
      const error = {
        message: 'Error',
        response: {
          data: {
            errors: [{ detail: 'Detailed error message' }],
          },
        },
      };
      const result = extractErrorInfo(error);
      expect(result.description).toBe('Detailed error message');
    });

    it('should extract description from data.errors[0].detail', () => {
      const error = {
        message: 'Error',
        data: {
          errors: [{ detail: 'Data error detail' }],
        },
      };
      const result = extractErrorInfo(error);
      expect(result.description).toBe('Data error detail');
    });

    it('should join multiple errors from array', () => {
      const error = {
        message: 'Error',
        response: {
          data: {
            errors: [
              { message: 'Error 1' },
              { detail: 'Error 2' },
              'Error 3',
            ],
          },
        },
      };
      const result = extractErrorInfo(error);
      expect(result.description).toBe('Error 1, Error 2, Error 3');
    });

    it('should extract description from response.data.error', () => {
      const error = {
        message: 'Error',
        response: {
          data: {
            error: 'Single error message',
          },
        },
      };
      const result = extractErrorInfo(error);
      expect(result.description).toBe('Single error message');
    });

    it('should extract description from response.data.message', () => {
      const error = {
        errors: 'Error',
        response: {
          data: {
            message: 'Data message',
          },
        },
      };
      const result = extractErrorInfo(error);
      expect(result.description).toBe('Data message');
    });

    it('should extract description from response.body.errors array', () => {
      const error = {
        message: 'Error',
        response: {
          body: {
            errors: [{ message: 'Body error 1' }, { detail: 'Body error 2' }],
          },
        },
      };
      const result = extractErrorInfo(error);
      expect(result.description).toBe('Body error 1, Body error 2');
    });

    it('should extract description from response.data string', () => {
      const error = {
        message: 'Error',
        response: {
          data: 'String error data',
        },
      };
      const result = extractErrorInfo(error);
      expect(result.description).toBe('String error data');
    });

    it('should extract description from errorMessage property', () => {
      const error = {
        message: 'Error',
        errorMessage: 'Custom error message',
      };
      const result = extractErrorInfo(error);
      expect(result.description).toBe('Custom error message');
    });

    it('should use error.message as description when no other source found', () => {
      const error = {
        message: 'Standard error message',
      };
      const result = extractErrorInfo(error);
      expect(result.description).toBe('Standard error message');
    });

    it('should truncate long descriptions with newlines', () => {
      const longError = 'Error message\n' + 'x'.repeat(600);
      const error = {
        message: longError,
      };
      const result = extractErrorInfo(error);
      expect(result.description).toBe('Error message...');
    });

    it('should handle non-string description values by stringifying', () => {
      const error = {
        message: 'Error',
        response: {
          data: {
            error: { complex: 'object' },
          },
        },
      };
      const result = extractErrorInfo(error);
      expect(result.description).toBe('{"complex":"object"}');
    });

    it('should handle errors during description extraction gracefully', () => {
      const error = {
        message: 'Error',
        get response() {
          throw new Error('Property access error');
        },
      };
      const result = extractErrorInfo(error);
      expect(result.description).toBe('Error');
    });
  });

  describe('createErrorResponse', () => {
    it('should create error response with default title', () => {
      const error = {
        message: 'API error',
        response: {
          status: 500,
        },
      };
      const result = createErrorResponse(error);
      expect(result).toEqual({
        success: false,
        error: {
          title: 'Operation failed',
          description: 'API error',
          status: 500,
          originalError: error,
        },
      });
    });

    it('should create error response with custom title', () => {
      const error = {
        message: 'Network error',
        status: 0,
      };
      const result = createErrorResponse(error, 'Failed to fetch data');
      expect(result).toEqual({
        success: false,
        error: {
          title: 'Failed to fetch data',
          description: 'Network error',
          status: 0,
          originalError: error,
        },
      });
    });

    it('should extract status from response.status', () => {
      const error = {
        message: 'Error',
        response: {
          status: 404,
        },
      };
      const result = createErrorResponse(error);
      expect(result.error.status).toBe(404);
    });

    it('should extract status from error.status directly', () => {
      const error = {
        message: 'Error',
        status: 403,
      };
      const result = createErrorResponse(error);
      expect(result.error.status).toBe(403);
    });

    it('should handle error without status', () => {
      const error = {
        message: 'Generic error',
      };
      const result = createErrorResponse(error);
      expect(result.error.status).toBeUndefined();
    });

    it('should preserve original error object', () => {
      const error = {
        message: 'Test error',
        customProperty: 'custom value',
      };
      const result = createErrorResponse(error);
      expect(result.error.originalError).toBe(error);
      expect(result.error.originalError.customProperty).toBe('custom value');
    });
  });

  describe('is404Error', () => {
    it('should return true for error with status 404', () => {
      const error = { status: 404 };
      expect(is404Error(error)).toBe(true);
    });

    it('should return true for error with response.status 404', () => {
      const error = {
        response: {
          status: 404,
        },
      };
      expect(is404Error(error)).toBe(true);
    });

    it('should return false for error with different status', () => {
      const error = { status: 500 };
      expect(is404Error(error)).toBe(false);
    });

    it('should return false for error without status', () => {
      const error = { message: 'Error' };
      expect(is404Error(error)).toBe(false);
    });

    it('should return false for null error', () => {
      expect(is404Error(null)).toBe(false);
    });

    it('should return false for undefined error', () => {
      expect(is404Error(undefined)).toBe(false);
    });
  });

  describe('isNetworkError', () => {
    it('should return true for network error', () => {
      const error = {
        message: 'Network Error',
      };
      expect(isNetworkError(error)).toBe(true);
    });

    it('should return false for error with response', () => {
      const error = {
        message: 'Network Error',
        response: {
          status: 500,
        },
      };
      expect(isNetworkError(error)).toBe(false);
    });

    it('should return false for error with different message', () => {
      const error = {
        message: 'Something else',
      };
      expect(isNetworkError(error)).toBe(false);
    });

    it('should return false for null error', () => {
      expect(isNetworkError(null)).toBe(false);
    });
  });
});
