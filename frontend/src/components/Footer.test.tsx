import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer Component', () => {
  it('renders footer with links', () => {
    render(<Footer />);

    const githubLink = screen.getByText('Github');
    expect(githubLink).toBeDefined();
    expect(githubLink.getAttribute('href')).toBe('https://github.com/jackbloo');
  });

  it('displays version information', () => {
    render(<Footer />);

    expect(screen.getByText('v2.1.0')).toBeDefined();
  });

  it('displays axios powered badge', () => {
    render(<Footer />);

    expect(screen.getByText('AXIOS POWERED')).toBeDefined();
  });
});
