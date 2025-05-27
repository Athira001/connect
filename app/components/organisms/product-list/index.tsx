'use client';

import { useSelector } from 'react-redux';
import { useEffect, useState, useRef, useCallback } from 'react';

import { RootState } from '@/app/store/store';
import FilterBar from '../../molecules/filter-bar';
import ProductSummaryCard from '../../molecules/product-summary-card';

import styles from './prosduct-list.module.css';

const ITEMS_PER_LOAD = 8;

interface Product {
  id: number;
  title: string;
  creator: string;
  imagePath: string;
  pricingOption: number;
  price?: number;
}

interface PricingOption {
  label: string;
  value: number;
}

const pricingOptions: PricingOption[] = [
  { label: 'Paid', value: 0 },
  { label: 'Free', value: 1 },
  { label: 'View Only', value: 2 },
];

const ProductList = () => {
  const searchTerm = useSelector((state: RootState) => state.search.term.toLowerCase());

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://closet-recruiting-api.azurewebsites.net/api/data');
        const data: Product[] = await res.json();
        setAllProducts(data);
        setVisibleProducts(data.slice(0, ITEMS_PER_LOAD));
      } catch (error) {
        console.error('Error fetching product data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getFilteredProducts = (): Product[] => {
    const filtered = selectedFilters.length
      ? allProducts.filter((p) => selectedFilters.includes(p.pricingOption))
      : allProducts;

    if (searchTerm) {
      return filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm) ||
          p.creator.toLowerCase().includes(searchTerm)
      );
    }

    return filtered;
  };

  const loadMore = useCallback(() => {
    if (isFetchingMore) return;

    setIsFetchingMore(true);
    setTimeout(() => {
      const filtered = getFilteredProducts();
      setVisibleProducts((prev) => {
        const next = filtered.slice(prev.length, prev.length + ITEMS_PER_LOAD);
        return [...prev, ...next];
      });
      setIsFetchingMore(false);
    }, 400);
  }, [isFetchingMore, allProducts, selectedFilters, searchTerm]);

  useEffect(() => {
    const filtered = getFilteredProducts();
    setVisibleProducts(filtered.slice(0, ITEMS_PER_LOAD));
  }, [selectedFilters, allProducts, searchTerm]);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingMore) {
          loadMore();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [loadMore, isFetchingMore]);

  const toggleFilter = (value: number) => {
    setSelectedFilters((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const resetFilters = () => {
    setSelectedFilters([]);
  };

  if (loading) {
    return (
      <div className={styles.loadingWrapper}>
        <div className={styles.loader}></div>
        <div className={styles.loadingInfo}>Loading products...</div>
      </div>
    );
  }

  return (
    <>
      <FilterBar
        pricingOptions={pricingOptions}
        selectedFilters={selectedFilters}
        toggleFilter={toggleFilter}
        resetFilters={resetFilters}
      />

      <div className={styles.productListWrapper}>
        {visibleProducts.map((product) => (
          <ProductSummaryCard product={product} key={product.id} />
        ))}

        {visibleProducts.length < getFilteredProducts().length && (
          <div ref={observerRef} className={styles.loadingMore}>
            Loading more...
          </div>
        )}
      </div>

      {visibleProducts.length === 0 && (
        <div className={styles.notFoundWrapper}>
          <div className={styles.notFound}>No Results Found.</div>
          <p className={styles.info}>
            Check the spelling, or try a different search term.
          </p>
        </div>
      )}
    </>
  );
};

export default ProductList;
