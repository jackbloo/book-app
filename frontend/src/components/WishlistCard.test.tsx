import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { WishlistCard } from './WishlistCard';

describe('WishlistCard Component', () => {
  const mockItem = {
    volumeId: 'test-id-1',
    title: 'Test Book',
    authors: ['Test Author'],
    thumbnail: 'https://example.com/book.jpg',
    rating: 4.5
  };

  const mockOnRemove = vi.fn();

  it('renders wishlist card with book info', () => {
    render(<WishlistCard item={mockItem} onRemove={mockOnRemove} />);

    expect(screen.getByText('Test Book')).toBeDefined();
    expect(screen.getByText('Test Author')).toBeDefined();
  });

  it('displays verified badge', () => {
    render(<WishlistCard item={mockItem} onRemove={mockOnRemove} />);

    expect(screen.getByText('Verified')).toBeDefined();
  });

  it('displays book thumbnail', () => {
    render(<WishlistCard item={mockItem} onRemove={mockOnRemove} />);

    const img = screen.getByAltText('Test Book') as HTMLImageElement;
    expect(img.src).toContain('example.com');
  });

  it('calls onRemove when remove button clicked', () => {
    const { container } = render(<WishlistCard item={mockItem} onRemove={mockOnRemove} />);

    const removeButton = container.querySelector('button');
    if (removeButton) {
      fireEvent.click(removeButton);
      expect(mockOnRemove).toHaveBeenCalled();
    }
  });

  it('handles multiple authors', () => {
    const itemWithMultipleAuthors = {
      ...mockItem,
      authors: ['Author One', 'Author Two']
    };

    render(<WishlistCard item={itemWithMultipleAuthors} onRemove={mockOnRemove} />);

    expect(screen.getByText('Author One, Author Two')).toBeDefined();
  });
});
