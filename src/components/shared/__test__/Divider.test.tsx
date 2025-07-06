import { render, screen } from '@testing-library/react';
import Divider from '../Divider';

describe('Divider', () => {
  it('renders with center text', () => {
    render(<Divider text="OR" />);
    expect(screen.getByText('OR')).toBeInTheDocument();
    const text = screen.getByText('OR');
    expect(text.className).toMatch(/px-4/);
    // Should not have left or right absolute classes
    expect(text.className).not.toMatch(/left-0/);
    expect(text.className).not.toMatch(/right-0/);
  });

  it('renders with left text', () => {
    render(<Divider text="LEFT" textPosition="left" />);
    const text = screen.getByText('LEFT');
    expect(text.className).toMatch(/left-0/);
    expect(text.className).not.toMatch(/right-0/);
  });

  it('renders with right text', () => {
    render(<Divider text="RIGHT" textPosition="right" />);
    const text = screen.getByText('RIGHT');
    expect(text.className).toMatch(/right-0/);
    expect(text.className).not.toMatch(/left-0/);
  });

  it('applies custom className', () => {
    render(<Divider text="Custom" className="my-custom-class" />);
    expect(screen.getByText('Custom').parentElement?.className).toMatch(/my-custom-class/);
  });
});