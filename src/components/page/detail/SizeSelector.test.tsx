import { render, screen, fireEvent } from '@testing-library/react';
import SizeSelector from './SizeSelector';

// Mock t function
jest.mock('../../../helpers/i18n', () => ({
  t: (key: string) => key,
}));

const mockSizes = [
  {
    id: '1',
    name: 'M',
    minHeight: 0,
    maxHeight: 0,
    minWeight: 0,
    maxWeight: 0,
    createdAt: '',
    createdBy: '',
    updatedAt: '',
    updatedBy: '',
  },
  {
    id: '2',
    name: 'L',
    minHeight: 0,
    maxHeight: 0,
    minWeight: 0,
    maxWeight: 0,
    createdAt: '',
    createdBy: '',
    updatedAt: '',
    updatedBy: '',
  },
];

describe('SizeSelector', () => {
  it('renders size selector title', () => {
    render(
      <SizeSelector sizes={mockSizes} selectedSize="1" onChange={jest.fn()} />
    );
    expect(screen.getByText('lbl.chooseSize')).toBeInTheDocument();
  });

  it('renders all size buttons', () => {
    render(
      <SizeSelector sizes={mockSizes} selectedSize="1" onChange={jest.fn()} />
    );
    expect(screen.getByText('M')).toBeInTheDocument();
    expect(screen.getByText('L')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(mockSizes.length);
  });

  it('calls onChange with correct size id when a size is clicked', () => {
    const handleChange = jest.fn();
    render(
      <SizeSelector
        sizes={mockSizes}
        selectedSize="1"
        onChange={handleChange}
      />
    );
    fireEvent.click(screen.getByText('L'));
    expect(handleChange).toHaveBeenCalledWith('2');
  });

  it('applies selected style to the selected size', () => {
    render(
      <SizeSelector sizes={mockSizes} selectedSize="2" onChange={jest.fn()} />
    );
    const selectedButton = screen.getByText('L');
    expect(selectedButton.className).toMatch(/bg-black/);
    expect(selectedButton.className).toMatch(/text-white/);
  });
});
