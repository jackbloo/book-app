import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { StarRating } from './StarRating';

describe('StarRating Component', () => {
  it('renders full stars correctly', () => {
    render(<StarRating rating={4} />);

    const ratingText = screen.getByText('4.0');
    expect(ratingText).toBeDefined();
  });

  it('displays decimal rating', () => {
    render(<StarRating rating={3.5} />);

    expect(screen.getByText('3.5')).toBeDefined();
  });

  it('handles zero rating', () => {
    const { container } = render(<StarRating rating={0} />);

    expect(container).toBeDefined();
  });

  it('supports custom max stars', () => {
    render(<StarRating rating={3} max={10} />);

    expect(screen.getByText('3.0')).toBeDefined();
  });

  it('supports custom size prop', () => {
    const { container } = render(<StarRating rating={4.5} size={20} />);

    expect(container).toBeDefined();
  });
});
