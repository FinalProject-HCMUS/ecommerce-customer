import { render, screen, fireEvent } from '@testing-library/react';
import ColorSelector from './ColorSelector';

// Mock t function
jest.mock('../../../helpers/i18n', () => ({
  t: (key: string) => key,
}));

const mockColors = [
  {
    id: '1',
    name: 'purple',
    code: '#800080',
    createdAt: '',
    createdBy: '',
    updatedAt: '',
    updatedBy: '',
  },
  {
    id: '2',
    name: 'yellow',
    code: '#FFFF00',
    createdAt: '',
    createdBy: '',
    updatedAt: '',
    updatedBy: '',
  },
];

describe('ColorSelector', () => {
  it('renders color selector title', () => {
    render(
      <ColorSelector
        colors={mockColors}
        selectedColor="1"
        onChange={jest.fn()}
      />
    );
    expect(screen.getByText('lbl.selectColor')).toBeInTheDocument();
  });

  it('renders all color buttons', () => {
    render(
      <ColorSelector
        colors={mockColors}
        selectedColor="1"
        onChange={jest.fn()}
      />
    );
    expect(screen.getAllByRole('button')).toHaveLength(mockColors.length);
    expect(screen.getByLabelText('Select 1 color')).toBeInTheDocument();
    expect(screen.getByLabelText('Select 2 color')).toBeInTheDocument();
  });

  it('calls onChange with correct color id when a color is clicked', () => {
    const handleChange = jest.fn();
    render(
      <ColorSelector
        colors={mockColors}
        selectedColor="1"
        onChange={handleChange}
      />
    );
    fireEvent.click(screen.getByLabelText('Select 2 color'));
    expect(handleChange).toHaveBeenCalledWith('2');
  });

  it('applies selected style to the selected color', () => {
    render(
      <ColorSelector
        colors={mockColors}
        selectedColor="2"
        onChange={jest.fn()}
      />
    );
    const selectedButton = screen.getByLabelText('Select 2 color');
    expect(selectedButton.className).toMatch(/ring-2/);
    expect(selectedButton.className).toMatch(/scale-110/);
  });
});
