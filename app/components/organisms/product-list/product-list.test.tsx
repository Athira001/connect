/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductSummaryCard from '../../molecules/product-summary-card';

jest.mock('next/image', () => (props: any) => {
  const { src, alt, ...rest } = props;
  return <img src={typeof src === 'string' ? src : ''} alt={alt} {...rest} />;
});

describe('ProductSummaryCard', () => {
  const product = {
    id: 1,
    title: 'Test Product',
    creator: 'John Doe',
    imagePath: '/test-image.jpg',
    pricingOption: 0,
    price: 100,
  };

  test('renders product info correctly', () => {
    render(<ProductSummaryCard product={product} />);

    const img = screen.getByAltText('Test Product') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('/test-image.jpg');
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Paid')).toBeInTheDocument();
  });

  test('falls back to fallback image on error', () => {
    render(<ProductSummaryCard product={product} />);

    const img = screen.getByAltText('Test Product') as HTMLImageElement;

    fireEvent.error(img);
    const fallbackImage =
      'https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_3.jpeg';
    expect(img.src).toContain(fallbackImage);
  });
});
