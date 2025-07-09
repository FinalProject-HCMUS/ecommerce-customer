import { render, screen } from '@testing-library/react';
import ProfileHeader from './ProfileHeader';

// Mock t function
jest.mock('../../../helpers/i18n', () => ({
  t: (key: string) => key,
}));

// Mock framer-motion to render children directly
jest.mock('framer-motion', () => ({
  motion: {
    div: (props: any) => <div {...props} />,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('ProfileHeader', () => {
  it('renders saved message when showSavedMessage is true', () => {
    render(<ProfileHeader showSavedMessage={true} />);
    expect(screen.getByText('profile.updateProfile')).toBeInTheDocument();
  });

  it('does not render saved message when showSavedMessage is false', () => {
    render(<ProfileHeader showSavedMessage={false} />);
    expect(screen.queryByText('profile.updateProfile')).not.toBeInTheDocument();
  });
});
