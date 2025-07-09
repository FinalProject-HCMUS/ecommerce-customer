import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../Pagination';

// Mock t function to just return the key for easier assertions
jest.mock('../../../helpers/i18n', () => ({
  t: (key: string) => key,
}));

describe('Pagination', () => {
  it('renders all pages when totalPages <= 5', () => {
    render(
      <Pagination currentPage={2} totalPages={4} onPageChange={() => {}} />
    );
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.queryByText('...')).not.toBeInTheDocument();
  });

  it('renders ellipsis for many pages', () => {
    render(
      <Pagination currentPage={5} totalPages={10} onPageChange={() => {}} />
    );
    // Should show first, last, and ellipsis
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getAllByText('...').length).toBeGreaterThan(0);
  });

  it('disables previous button on first page', () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />
    );
    expect(
      screen.getByText('pagination.previous').closest('button')
    ).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(
      <Pagination currentPage={5} totalPages={5} onPageChange={() => {}} />
    );
    expect(
      screen.getByText('pagination.next').closest('button')
    ).toBeDisabled();
  });

  it('calls onPageChange when page number is clicked', () => {
    const onPageChange = jest.fn();
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />
    );
    fireEvent.click(screen.getByText('3'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('calls onPageChange when previous/next is clicked', () => {
    const onPageChange = jest.fn();
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />
    );
    fireEvent.click(screen.getByText('pagination.previous'));
    expect(onPageChange).toHaveBeenCalledWith(1);
    fireEvent.click(screen.getByText('pagination.next'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('shows correct active page styling', () => {
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={() => {}} />
    );
    const activeBtn = screen.getByText('3').closest('button');
    expect(activeBtn).toHaveClass('bg-black');
    expect(activeBtn).toHaveClass('text-white');
  });
});
