import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';

describe('Header Component', () => {
  const mockProps = {
    searchQuery: '',
    onSearchChange: vi.fn(),
    activeTab: 'search' as const,
    onTabChange: vi.fn(),
    wishlistCount: 0,
    isMobileMenuOpen: false,
    onMobileMenuToggle: vi.fn(),
    onClearSearch: vi.fn(),
  };

  it('renders header with logo', () => {
    render(<Header {...mockProps} />);

    expect(screen.getByText('Book')).toBeDefined();
    expect(screen.getByText('App')).toBeDefined();
  });

  it('renders search input', () => {
    render(<Header {...mockProps} />);

    const searchInput = screen.getByPlaceholderText('Search books...');
    expect(searchInput).toBeDefined();
  });

  it('calls onSearchChange when input changes', () => {
    const onSearchChange = vi.fn();
    render(<Header {...mockProps} onSearchChange={onSearchChange} />);

    const searchInput = screen.getByPlaceholderText('Search books...');
    fireEvent.change(searchInput, { target: { value: 'test' } });

    expect(onSearchChange).toHaveBeenCalled();
  });

  it('displays wishlist count badge', () => {
    render(<Header {...mockProps} wishlistCount={5} />);

    expect(screen.getByText('5')).toBeDefined();
  });

  it('calls onTabChange when Discover button clicked', () => {
    const onTabChange = vi.fn();
    render(<Header {...mockProps} onTabChange={onTabChange} />);

    const discoverButton = screen.getByText('Discover');
    fireEvent.click(discoverButton);

    expect(onTabChange).toHaveBeenCalled();
  });
});
