import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Sidebar } from './Sidebar';

describe('Sidebar Component', () => {
  const mockWishlistItem = {
    _id: '1',
    volumeId: 'test-1',
    title: 'Test Book',
    authors: ['Author One'],
    thumbnail: 'http://example.com/thumb.jpg',
    rating: 4.5
  };

  it('displays wishlist count', () => {
    render(
      <Sidebar
        wishlist={[mockWishlistItem]}
        onEnterLibrary={vi.fn()}
      />
    );

    expect(screen.getByText('1 VOL(S)')).toBeDefined();
  });

  it('displays latest saves title', () => {
    render(
      <Sidebar
        wishlist={[mockWishlistItem]}
        onEnterLibrary={vi.fn()}
      />
    );

    expect(screen.getByText('LATEST SAVES')).toBeDefined();
  });

  it('displays wishlist items', () => {
    render(
      <Sidebar
        wishlist={[mockWishlistItem]}
        onEnterLibrary={vi.fn()}
      />
    );

    expect(screen.getByText('Test Book')).toBeDefined();
    expect(screen.getByText('Author One')).toBeDefined();
  });

  it('displays empty library message when no items', () => {
    render(
      <Sidebar
        wishlist={[]}
        onEnterLibrary={vi.fn()}
      />
    );

    expect(screen.getByText('Library empty')).toBeDefined();
    expect(screen.getByText('0 VOL(S)')).toBeDefined();
  });

  it('calls onEnterLibrary when button clicked', () => {
    const onEnterLibrary = vi.fn();

    render(
      <Sidebar
        wishlist={[mockWishlistItem]}
        onEnterLibrary={onEnterLibrary}
      />
    );

    const button = screen.getByText('Enter Library');
    fireEvent.click(button);

    expect(onEnterLibrary).toHaveBeenCalled();
  });

  it('displays only first 5 items', () => {
    const manyItems = Array.from({ length: 10 }, (_, i) => ({
      ...mockWishlistItem,
      _id: `${i}`,
      title: `Book ${i}`
    }));

    render(
      <Sidebar
        wishlist={manyItems}
        onEnterLibrary={vi.fn()}
      />
    );

    expect(screen.getByText('Book 0')).toBeDefined();
    expect(screen.queryByText('Book 9')).toBeNull();
  });
});
