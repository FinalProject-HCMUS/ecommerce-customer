import { toast } from 'react-toastify';

const showManyError = (errors: string[]): void => {
  for (let i = 0; i < errors.length; i++) {
    toast.error(errors[i], {
      position: 'bottom-right',
    });
  }
};

const showError = (message: string | string[]): void => {
  if (Array.isArray(message)) {
    showManyError(message);
    return;
  }
  toast.error(message, {
    position: 'bottom-right',
  });
};

const showSuccess = (message: string) => {
  toast.success(message, {
    position: 'bottom-right',
  });
};

export { showManyError, showError, showSuccess };
