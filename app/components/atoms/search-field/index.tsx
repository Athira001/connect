'use client';

import styles from './input-field.module.css';

interface SearchFieldProps {
  type?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  id?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  onClear?: () => void;
}

const SearchField: React.FC<SearchFieldProps> = ({
  type = 'text',
  name,
  onChange,
  placeholder = 'Placeholder text...',
  required = false,
  id = '',
  value = '',
  onClear,
}) => {
  return (
    <div className={styles.searchInputWrapper}>
      <input
        className={styles.searchInput}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={(e) => onChange(e, name)}
        required={required}
        id={id}
        value={value}
      />
      {value && onClear && (
        <button
          type="button"
          className={styles.clearButton}
          onClick={onClear}
          aria-label="Clear input"
        >
          &#10006;
        </button>
      )}
    </div>
  );
};

export default SearchField;
