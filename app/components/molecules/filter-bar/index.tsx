'use client';

import Checkbox from "../../atoms/checkbox";
import styles from './filter-bar.module.css';

interface PricingOption {
  label: string;
  value: number;
}

interface FilterBarProps {
  pricingOptions: PricingOption[];
  selectedFilters: number[];
  toggleFilter: (value: number) => void;
  resetFilters: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  pricingOptions,
  selectedFilters,
  toggleFilter,
  resetFilters,
}) => {
  return (
    <div className={styles.filterWrapper}>
      <div>
        <label className={styles.options}>Pricing Option</label>
        {pricingOptions.map(({ label, value }) => (
          <Checkbox
            key={value}
            label={label}
            checked={selectedFilters.includes(value)}
            onChange={() => toggleFilter(value)}
          />
        ))}
      </div>
      <button onClick={resetFilters} className={styles.resetButton}>
        Reset
      </button>
    </div>
  );
};

export default FilterBar;
