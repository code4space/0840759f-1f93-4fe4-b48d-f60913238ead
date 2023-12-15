import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import LoadingUI from '@/components/loading';

describe('LoadingUI', () => {
  test('renders loading spinner', () => {
    render(<LoadingUI />);
    const spinner = screen.getByTestId('loading');
    expect(spinner).toBeInTheDocument();
  });

  test('renders spinner with correct viewBox, stroke, and strokeWidth values', () => {
    render(<LoadingUI />);
    const svg = screen.getByTestId('loading').querySelector('svg');

    expect(svg).toHaveAttribute('viewBox', '0 0 100 100');
  });
});