import { render, screen, fireEvent } from '@testing-library/react';
import Filters from './Filters';

// Mock t and formatCurrency
jest.mock('../../../helpers/i18n', () => ({
  t: (key: string) => key,
}));
jest.mock('../../../helpers/string', () => ({
  formatCurrency: (value: number, currency: string) => `${value}-${currency}`,
}));

// Mock framer-motion to render children directly
jest.mock('framer-motion', () => ({
  motion: {
    div: (props: any) => <div {...props} />,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock react-feather icons
jest.mock('react-feather', () => ({
  ChevronDown: (props: any) => <svg data-testid="chevron-down" {...props} />,
  ChevronUp: (props: any) => <svg data-testid="chevron-up" {...props} />,
}));

// Mock antd Slider
jest.mock('antd', () => ({
  Slider: (props: any) => (
    <input
      data-testid="slider"
      type="range"
      min={props.min}
      max={props.max}
      value={props.value[1]}
      onChange={(e) => props.onChange([props.value[0], Number(e.target.value)])}
    />
  ),
}));

// Mock useSettingsContext
jest.mock('../../../context/settingContext', () => ({
  useSettingsContext: () => ({
    settings: [
      { key: 'MaxPriceFilter', value: 1000 },
      { key: 'CurrencyCode', value: 'USD' },
    ],
  }),
}));

const categories = [
  {
    id: 'cat1',
    name: 'Shirts',
    description: '',
    createdAt: '',
    createdBy: '',
    updatedAt: '',
    updatedBy: '',
  },
  {
    id: 'cat2',
    name: 'Pants',
    description: '',
    createdAt: '',
    createdBy: '',
    updatedAt: '',
    updatedBy: '',
  },
];
const colors = [
  {
    id: 'col1',
    name: 'Red',
    code: '#ff0000',
    createdAt: '',
    createdBy: '',
    updatedAt: '',
    updatedBy: '',
  },
  {
    id: 'col2',
    name: 'Blue',
    code: '#0000ff',
    createdAt: '',
    createdBy: '',
    updatedAt: '',
    updatedBy: '',
  },
];
const sizes = [
  {
    id: 'sz1',
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
    id: 'sz2',
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

describe('Filters', () => {
  const defaultProps = {
    priceRange: [0, 500] as [number, number],
    setPriceRange: jest.fn(),
    selectedColor: '',
    setSelectedColor: jest.fn(),
    selectedSize: '',
    setSelectedSize: jest.fn(),
    selectedCategory: '',
    setSelectedCategory: jest.fn(),
    categories,
    colors,
    sizes,
  };

  it('renders filter headings', () => {
    render(<Filters {...defaultProps} />);
    expect(screen.getByText('lbl.filter')).toBeInTheDocument();
    expect(screen.getByText('lbl.category')).toBeInTheDocument();
    expect(screen.getByText('lbl.price')).toBeInTheDocument();
    expect(screen.getByText('lbl.color')).toBeInTheDocument();
    expect(screen.getByText('lbl.size')).toBeInTheDocument();
  });

  it('renders categories and handles category selection', () => {
    const setSelectedCategory = jest.fn();
    render(
      <Filters {...defaultProps} setSelectedCategory={setSelectedCategory} />
    );
    expect(screen.getByText('Shirts')).toBeInTheDocument();
    expect(screen.getByText('Pants')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Shirts'));
    expect(setSelectedCategory).toHaveBeenCalledWith('cat1');
  });

  it('renders price range and handles slider change', () => {
    const setPriceRange = jest.fn();
    render(<Filters {...defaultProps} setPriceRange={setPriceRange} />);
    expect(screen.getByText('0-USD')).toBeInTheDocument();
    expect(screen.getByText('500-USD')).toBeInTheDocument();
    fireEvent.change(screen.getByTestId('slider'), { target: { value: 600 } });
    expect(setPriceRange).toHaveBeenCalledWith([0, 600]);
  });

  it('renders sizes and handles size selection', () => {
    const setSelectedSize = jest.fn();
    render(<Filters {...defaultProps} setSelectedSize={setSelectedSize} />);
    expect(screen.getByText('M')).toBeInTheDocument();
    expect(screen.getByText('L')).toBeInTheDocument();
    fireEvent.click(screen.getByText('M'));
    expect(setSelectedSize).toHaveBeenCalledWith('M');
  });

  it('toggles sections when headings are clicked', () => {
    render(<Filters {...defaultProps} />);
    fireEvent.click(screen.getByText('lbl.category'));
    fireEvent.click(screen.getByText('lbl.price'));
    fireEvent.click(screen.getByText('lbl.color'));
    fireEvent.click(screen.getByText('lbl.size'));
    // Should still render headings after toggling
    expect(screen.getByText('lbl.category')).toBeInTheDocument();
    expect(screen.getByText('lbl.price')).toBeInTheDocument();
    expect(screen.getByText('lbl.color')).toBeInTheDocument();
    expect(screen.getByText('lbl.size')).toBeInTheDocument();
  });
});
