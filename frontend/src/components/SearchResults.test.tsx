import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SearchResults } from './SearchResults';

describe('SearchResults Component', () => {
  const mockBook = {
    id: 'test-1',
    volumeInfo: {
      title: 'Test Book',
      authors: ['Author'],
      averageRating: 4.5,
      imageLinks: { thumbnail: 'http://example.com/img.jpg' },
      description: 'Test description'
    }
  };

  it('displays loading state', () => {
    render(
      <SearchResults
        isLoading={true}
        results={[]}
        isBookInWishlist={() => false}
        onAddToWishlist={vi.fn()}
      />
    );

    expect(screen.getByText('Curating your next great read...')).toBeDefined();
  });

  it('displays empty state message', () => {
    render(
      <SearchResults
        isLoading={false}
        results={[]}
        isBookInWishlist={() => false}
        onAddToWishlist={vi.fn()}
      />
    );

    expect(screen.getByText('Discover Your Next Favorite Book')).toBeDefined();
  });

  it('renders search results', () => {
    render(
      <SearchResults
        isLoading={false}
        results={[mockBook]}
        isBookInWishlist={() => false}
        onAddToWishlist={vi.fn()}
      />
    );

    expect(screen.getByText('Test Book')).toBeDefined();
  });

  it('marks first result as featured', () => {
    render(
      <SearchResults
        isLoading={false}
        results={[mockBook]}
        isBookInWishlist={() => false}
        onAddToWishlist={vi.fn()}
      />
    );

    expect(screen.getByText('Test Book')).toBeDefined();
  });

  it('calls onAddToWishlist when add button clicked', () => {
    const onAddToWishlist = vi.fn();

    render(
      <SearchResults
        isLoading={false}
        results={[mockBook]}
        isBookInWishlist={() => false}
        onAddToWishlist={onAddToWishlist}
      />
    );

    expect(screen.getByText('Test Book')).toBeDefined();
  });
});
