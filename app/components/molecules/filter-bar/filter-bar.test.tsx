/* eslint-disable react/display-name */

import { render, screen, fireEvent } from '@testing-library/react';
import FilterBar from './index';

const pricingOptions = [
  { label: 'Free', value: 0 },
  { label: 'Basic', value: 1 },
  { label: 'Premium', value: 2 },
];

describe('FilterBar', () => {
  const toggleFilter = jest.fn();
  const resetFilters = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders pricing options with correct checked states', () => {
    const selectedFilters = [1];

    render(
      <FilterBar
        pricingOptions={pricingOptions}
        selectedFilters={selectedFilters}
        toggleFilter={toggleFilter}
        resetFilters={resetFilters}
      />
    );

    pricingOptions.forEach(({ label, value }) => {
      const checkbox = screen.getByLabelText(label);
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveProperty('checked', selectedFilters.includes(value));
    });
  });

  test('calls toggleFilter when checkbox is clicked', () => {
    const selectedFilters: number[] = [];

    render(
      <FilterBar
        pricingOptions={pricingOptions}
        selectedFilters={selectedFilters}
        toggleFilter={toggleFilter}
        resetFilters={resetFilters}
      />
    );

    const checkbox = screen.getByLabelText('Free');
    fireEvent.click(checkbox);

    expect(toggleFilter).toHaveBeenCalledTimes(1);
    expect(toggleFilter).toHaveBeenCalledWith(0);
  });

  test('calls resetFilters when Reset button is clicked', () => {
    render(
      <FilterBar
        pricingOptions={pricingOptions}
        selectedFilters={[]}
        toggleFilter={toggleFilter}
        resetFilters={resetFilters}
      />
    );

    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);

    expect(resetFilters).toHaveBeenCalledTimes(1);
  });
});
