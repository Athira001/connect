'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useState, FormEvent, ChangeEvent } from 'react';

import { setSearchTerm } from '@/app/store/searchSlice';
import { RootState } from '@/app/store/store';
import SearchField from '../../atoms/search-field';
import Title from '../../atoms/title';

import styles from './top-bar.module.css';

const TopBar = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.search.term);
  const [inputValue, setInputValue] = useState<string>(searchTerm || '');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setSearchTerm(inputValue));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClear = () => {
    setInputValue('');
    dispatch(setSearchTerm(''));
  };

  return (
    <div className={styles.topHeaderContainerFluid}>
      <div className={styles.topHeaderContainer}>
        <Title text="Share your ideas. Empower your design." />
        <form className={styles.formWrapper} onSubmit={handleSubmit}>
          <SearchField
            type="text"
            name="search"
            value={inputValue}
            onChange={handleChange}
            onClear={handleClear}
            id="search-input-field"
            placeholder="Find the items you’re looking for"
          />
          <button className={styles.submitBtn} type="submit">
            &#128269;
          </button>
        </form>
      </div>
    </div>
  );
};

export default TopBar;
