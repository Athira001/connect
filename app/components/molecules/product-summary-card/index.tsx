'use client';

import Image from 'next/image';
import { useState } from 'react';

import styles from "./product-summary.module.css";

interface Product {
  id: number;
  title: string;
  creator: string;
  imagePath: string;
  pricingOption: number;
  price?: number;
}

interface ProductSummaryCardProps {
  product: Product;
}

const ProductSummaryCard: React.FC<ProductSummaryCardProps> = ({ product }) => {
  const [imgSrc, setImgSrc] = useState<string>(product.imagePath);

  const fallbackImage =
    'https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_3.jpeg';

  const getPricingLabel = (option: number): string => {
    switch (option) {
      case 0:
        return 'Paid';
      case 1:
        return 'Free';
      case 2:
        return 'View Only';
      default:
        return '';
    }
  };

  return (
    <div className={styles.card} key={product.id}>
      <a href="#">
        <figure className={styles.imageWrapper}>
          <Image
            src={imgSrc}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 200px"
            className={styles.image}
            onError={() => setImgSrc(fallbackImage)}
          />
        </figure>
      </a>
      <div className={styles.description}>
        <div>
          <div className={styles.creator}>
            <a href="#">{product.creator}</a>
          </div>
          <div className={styles.title}>{product.title}</div>
        </div>
        <div className={styles.price}>
          {getPricingLabel(product.pricingOption)}
        </div>
      </div>
    </div>
  );
};

export default ProductSummaryCard;
