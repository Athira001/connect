/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen, fireEvent } from '@testing-library/react';
import ProductSummaryCard from './index';

jest.mock('next/image', () => (props: any) => {
  return <img {...props} />;
});

const product = {
  id: 1,
  title: 'Test Product',
  creator: 'John Doe',
  imagePath: 'valid-image.jpg',
  pricingOption: 0,
  price: 100,
};

describe('ProductSummaryCard', () => {
  test('renders product info correctly', () => {
    render(<ProductSummaryCard product={product} />);

    expect(screen.getByText(product.creator)).toBeInTheDocument();
    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText('Paid')).toBeInTheDocument();

    const img = screen.getByAltText(product.title) as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain(product.imagePath);
  });

  test('displays correct pricing label for different options', () => {
    const { rerender } = render(<ProductSummaryCard product={{ ...product, pricingOption: 1 }} />);
    expect(screen.getByText('Free')).toBeInTheDocument();

    rerender(<ProductSummaryCard product={{ ...product, pricingOption: 2 }} />);
    expect(screen.getByText('View Only')).toBeInTheDocument();

    rerender(<ProductSummaryCard product={{ ...product, pricingOption: 99 }} />);
    expect(screen.queryByText(/Paid|Free|View Only/)).toBeNull();
  });

  test('sets fallback image on error', () => {
    render(<ProductSummaryCard product={product} />);

    const img = screen.getByAltText(product.title);

    fireEvent.error(img);

    expect(img).toHaveAttribute(
      'src',
      'https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_3.jpeg'
    );
  });
});
