import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BookCard } from './BookCard';

const mockBook = {
  id: 'test-book-1',
  volumeInfo: {
    title: 'Test Book Title',
    authors: ['Test Author'],
    imageLinks: {
      thumbnail: 'http://example.com/image.jpg'
    },
    averageRating: 4.5,
    description: 'Test book description'
  }
};

describe('BookCard Component', () => {
  it('renders book card with title and authors', () => {
    const mockOnAddToWishlist = vi.fn();

    render(
      <BookCard
        book={mockBook}
        isFeatured={false}
        isInWishlist={false}
        onAddToWishlist={mockOnAddToWishlist}
      />
    );

    expect(screen.getByText('Test Book Title')).toBeDefined();
    expect(screen.getByText('Test Author')).toBeDefined();
  });

  it('shows "Add to Wishlist" button when not in wishlist', () => {
    const mockOnAddToWishlist = vi.fn();

    render(
      <BookCard
        book={mockBook}
        isFeatured={false}
        isInWishlist={false}
        onAddToWishlist={mockOnAddToWishlist}
      />
    );

    expect(screen.getByText('Add to Wishlist')).toBeDefined();
  });

  it('shows "Locked In" button when in wishlist', () => {
    const mockOnAddToWishlist = vi.fn();

    render(
      <BookCard
        book={mockBook}
        isFeatured={true}
        isInWishlist={true}
        onAddToWishlist={mockOnAddToWishlist}
      />
    );

    expect(screen.getByText('Locked In')).toBeDefined();
  });

  it('calls onAddToWishlist when button clicked', () => {
    const mockOnAddToWishlist = vi.fn();

    render(
      <BookCard
        book={mockBook}
        isFeatured={false}
        isInWishlist={false}
        onAddToWishlist={mockOnAddToWishlist}
      />
    );

    const button = screen.getByText('Add to Wishlist');
    fireEvent.click(button);

    expect(mockOnAddToWishlist).toHaveBeenCalledTimes(1);
  });
});
