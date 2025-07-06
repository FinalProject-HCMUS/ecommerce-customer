const showSuccess = jest.fn();
const showError = jest.fn();

// Mock env

jest.mock('../../../helpers/env', () => ({
  SERVICE_ID: 'service_id',
  TEMPLATE_ID: 'template_id',
  PUBLIC_KEY: 'public_key',
}));

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Contact from './Contact';

// Mock t function
jest.mock('../../../helpers/i18n', () => ({
  t: (key: string) => key,
}));

// Mock contactInfo
jest.mock('../../../data/contactInfo', () => ({
  contactInfo: {
    phone: '123-456-7890',
    email: 'test@example.com',
    address: '123 Main St, City',
  },
}));

// Mock InputField and GeneralButton
jest.mock('../../shared/form/InputField', () => (props: any) => (
  <input
    data-testid={props.id}
    id={props.id}
    value={props.value}
    onChange={props.onChange}
    placeholder={props.placeholder}
  />
));
jest.mock('../../shared/Button', () => ({
  GeneralButton: (props: any) => (
    <button
      type={props.type}
      onClick={props.onClick}
      className={props.className}
    >
      {props.children}
    </button>
  ),
}));

// Mock emailjs
const sendMock = jest.fn();
jest.mock('@emailjs/browser', () => ({
  send: (...args: any[]) => sendMock(...args),
}));

jest.mock('../../../utils', () => ({
  messageRenderUtils: {
    showSuccess,
    showError,
  },
}));

describe('Contact', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders contact info and form fields', () => {
    render(<Contact />);
    expect(screen.getByText('lbl.contact')).toBeInTheDocument();
    expect(screen.getByText('lbl.contactText')).toBeInTheDocument();
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('123 Main St, City')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('placeholder.firstName')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('placeholder.lastName')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('placeholder.email')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('placeholder.phone')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('placeholder.message')
    ).toBeInTheDocument();
    expect(screen.getByText('btn.sendMessage')).toBeInTheDocument();
  });

  it('updates form fields on change', () => {
    render(<Contact />);
    const firstName = screen.getByPlaceholderText('placeholder.firstName');
    fireEvent.change(firstName, { target: { value: 'John' } });
    expect(firstName).toHaveValue('John');
    const lastName = screen.getByPlaceholderText('placeholder.lastName');
    fireEvent.change(lastName, { target: { value: 'Doe' } });
    expect(lastName).toHaveValue('Doe');
    const email = screen.getByPlaceholderText('placeholder.email');
    fireEvent.change(email, { target: { value: 'john@example.com' } });
    expect(email).toHaveValue('john@example.com');
    const phone = screen.getByPlaceholderText('placeholder.phone');
    fireEvent.change(phone, { target: { value: '555-5555' } });
    expect(phone).toHaveValue('555-5555');
    const message = screen.getByPlaceholderText('placeholder.message');
    fireEvent.change(message, { target: { value: 'Hello!' } });
    expect(message).toHaveValue('Hello!');
  });

  it('submits the form and shows success message', async () => {
    sendMock.mockResolvedValueOnce({});
    render(<Contact />);
    fireEvent.change(screen.getByPlaceholderText('placeholder.firstName'), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByPlaceholderText('placeholder.lastName'), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('placeholder.email'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('placeholder.phone'), {
      target: { value: '555-5555' },
    });
    fireEvent.change(screen.getByPlaceholderText('placeholder.message'), {
      target: { value: 'Hello!' },
    });
    fireEvent.click(screen.getByText('btn.sendMessage'));
    await waitFor(() => {
      expect(sendMock).toHaveBeenCalledWith(
        'service_id',
        'template_id',
        {
          from_name: 'John Doe',
          from_email: 'john@example.com',
          subject: 'Contact Form Submission',
          message: 'Hello!',
        },
        'public_key'
      );
      expect(showSuccess).toHaveBeenCalledWith('Message sent successfully!');
    });
  });

  it('shows error message if emailjs.send fails', async () => {
    sendMock.mockRejectedValueOnce(new Error('fail'));
    render(<Contact />);
    fireEvent.change(screen.getByPlaceholderText('placeholder.firstName'), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByPlaceholderText('placeholder.lastName'), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('placeholder.email'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('placeholder.phone'), {
      target: { value: '555-5555' },
    });
    fireEvent.change(screen.getByPlaceholderText('placeholder.message'), {
      target: { value: 'Hello!' },
    });
    fireEvent.click(screen.getByText('btn.sendMessage'));
    await waitFor(() => {
      expect(showError).toHaveBeenCalledWith(
        'Failed to send message. Please try again later.'
      );
    });
  });

  it('resets the form after successful submit', async () => {
    sendMock.mockResolvedValueOnce({});
    render(<Contact />);
    fireEvent.change(screen.getByPlaceholderText('placeholder.firstName'), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByPlaceholderText('placeholder.lastName'), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('placeholder.email'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('placeholder.phone'), {
      target: { value: '555-5555' },
    });
    fireEvent.change(screen.getByPlaceholderText('placeholder.message'), {
      target: { value: 'Hello!' },
    });
    fireEvent.click(screen.getByText('btn.sendMessage'));
    await waitFor(() => {
      expect(screen.getByPlaceholderText('placeholder.firstName')).toHaveValue(
        ''
      );
      expect(screen.getByPlaceholderText('placeholder.lastName')).toHaveValue(
        ''
      );
      expect(screen.getByPlaceholderText('placeholder.email')).toHaveValue('');
      expect(screen.getByPlaceholderText('placeholder.phone')).toHaveValue('');
      expect(screen.getByPlaceholderText('placeholder.message')).toHaveValue(
        ''
      );
    });
  });
});
