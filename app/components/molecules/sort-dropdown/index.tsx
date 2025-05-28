'use client';

import styles from "./sort-dropdown.module.css"

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange }) => {
  return (
    <div className={styles.sortWrapper}>
      <label htmlFor="sort">Sort by :</label>
      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.dropdown}
      >
        <option value="default">Default</option>
        <option value="name">Name (A–Z)</option>
        <option value="lowPrice">Price: Low to High</option>
        <option value="highPrice">Price: High to Low</option>
      </select>
    </div>
  );
};

export default SortDropdown;
