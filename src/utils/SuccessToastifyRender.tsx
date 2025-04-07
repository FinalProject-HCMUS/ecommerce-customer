// Import the toast function from the react-toastify library
import { toast } from 'react-toastify';

/**
 * Displays a success toast notification with the given message.
 *
 * @param {string} message - The message to display in the toast notification.
 */
const showSuccess = (message: string) => {
  toast.success(message, {
    position: 'bottom-right', // Position the toast notification at the bottom-right corner of the screen
  });
};

// Export the showSuccess function for use in other parts of the application
export { showSuccess };
