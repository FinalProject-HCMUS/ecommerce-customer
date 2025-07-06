import { render, screen } from '@testing-library/react';
import ProductDescription from './ProductDescription';

// Mock t function
jest.mock('../../../helpers/i18n', () => ({
  t: (key: string) => key,
}));

describe('ProductDescription', () => {
  it('renders the description title', () => {
    render(<ProductDescription description="<p>Some description</p>" />);
    expect(screen.getByText('lbl.description')).toBeInTheDocument();
  });

  it('renders HTML content from description', () => {
    render(<ProductDescription description="<p><b>Bold text</b> and <i>italic</i></p>" />);
    expect(screen.getByText('Bold text')).toBeInTheDocument();
    expect(screen.getByText('italic')).toBeInTheDocument();
  });
});