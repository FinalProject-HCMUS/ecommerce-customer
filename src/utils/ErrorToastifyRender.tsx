// Import the toast function from the react-toastify library
import { toast } from 'react-toastify';

/**
 * Displays multiple error toast notifications for each error message in the array.
 *
 * @param {string[]} errors - An array of error messages to display in the toast notifications.
 */
const showManyError = (errors: string[]): void => {
  for (let i = 0; i < errors.length; i++) {
    toast.error(errors[i], {
      position: 'bottom-right', // Position the toast notification at the bottom-right corner of the screen
    });
  }
};

/**
 * Displays a single error toast notification with the given message.
 *
 * @param {string | string[]} message - The message or array of messages to display in the toast notification.
 */
const showError = (message: string | string[]): void => {
  if (Array.isArray(message)) {
    showManyError(message);
    return;
  }
  toast.error(message, {
    position: 'bottom-right', // Position the toast notification at the bottom-right corner of the screen
  });
};

// Export the showManyError and showError functions for use in other parts of the application
export { showManyError, showError };
