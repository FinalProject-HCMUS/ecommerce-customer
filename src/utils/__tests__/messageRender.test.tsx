import { showManyError, showError, showSuccess } from '../messageRender';
import { toast } from 'react-toastify';

// Mock react-toastify
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

describe('messageRender utilities', () => {
  beforeEach(() => {
    // Clear mock calls before each test
    jest.clearAllMocks();
  });

  describe('showManyError', () => {
    it('should call toast.error for each error in the array', () => {
      const errors = ['Error 1', 'Error 2', 'Error 3'];
      showManyError(errors);
      
      expect(toast.error).toHaveBeenCalledTimes(3);
      errors.forEach((error, index) => {
        expect(toast.error).toHaveBeenNthCalledWith(index + 1, error, {
          position: 'bottom-right',
        });
      });
    });
    
    it('should handle empty array', () => {
      showManyError([]);
      expect(toast.error).not.toHaveBeenCalled();
    });
  });

  describe('showError', () => {
    it('should call toast.error with the message when given a string', () => {
      const message = 'Error message';
      showError(message);
      
      expect(toast.error).toHaveBeenCalledTimes(1);
      expect(toast.error).toHaveBeenCalledWith(message, {
        position: 'bottom-right',
      });
    });
    
    it('should call showManyError when given an array', () => {
      const messages = ['Error 1', 'Error 2'];
      showError(messages);
      
      expect(toast.error).toHaveBeenCalledTimes(2);
      messages.forEach((message, index) => {
        expect(toast.error).toHaveBeenNthCalledWith(index + 1, message, {
          position: 'bottom-right',
        });
      });
    });
  });

  describe('showSuccess', () => {
    it('should call toast.success with the message', () => {
      const message = 'Success message';
      showSuccess(message);
      
      expect(toast.success).toHaveBeenCalledTimes(1);
      expect(toast.success).toHaveBeenCalledWith(message, {
        position: 'bottom-right',
      });
    });
  });
});