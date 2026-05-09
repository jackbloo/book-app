import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MobileMenu } from './MobileMenu';

describe('MobileMenu Component', () => {
  const mockProps = {
    isOpen: true,
    activeTab: 'search' as const,
    onTabChange: vi.fn(),
    onClose: vi.fn(),
    wishlistCount: 0,
  };

  it('does not render when isOpen is false', () => {
    const { container } = render(<MobileMenu {...mockProps} isOpen={false} />);

    const discover = screen.queryByText('Discover');
    expect(discover).toBeNull();
  });

  it('renders menu items when open', () => {
    render(<MobileMenu {...mockProps} />);

    expect(screen.getByText('Discover')).toBeDefined();
    expect(screen.getByText('Wishlist')).toBeDefined();
  });

  it('displays wishlist count badge', () => {
    render(<MobileMenu {...mockProps} wishlistCount={3} />);

    expect(screen.getByText('3')).toBeDefined();
  });

  it('calls onTabChange and onClose when menu item clicked', () => {
    const onTabChange = vi.fn();
    const onClose = vi.fn();

    render(
      <MobileMenu
        {...mockProps}
        onTabChange={onTabChange}
        onClose={onClose}
      />
    );

    const discoverButton = screen.getByText('Discover');
    fireEvent.click(discoverButton);

    expect(onTabChange).toHaveBeenCalledWith('search');
    expect(onClose).toHaveBeenCalled();
  });

  it('highlights active tab', () => {
    const { container } = render(<MobileMenu {...mockProps} activeTab="wishlist" />);

    const wishlistButton = screen.getByText('Wishlist').closest('button');
    expect(wishlistButton?.className).toContain('bg-indigo-50');
  });
});
