
export interface Product {
  id: number;
  title: string;
  creator: string;
  imagePath: string;
  pricingOption: number;
  price: number;
}

export function sortProducts(products: Product[], sortOption: string): Product[] {
  const sorted = [...products];

  switch (sortOption) {
    case 'name':
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;

    case 'lowPrice':
      sorted.sort((a, b) => {
        const getRank = (option: number) => {
          if (option === 1) return 0; // Free
          if (option === 0) return 1; // Paid
          return 2; // View Only
        };

        const rankA = getRank(a.pricingOption);
        const rankB = getRank(b.pricingOption);

        if (rankA !== rankB) return rankA - rankB;

        if (rankA === 1) return (a.price ?? 0) - (b.price ?? 0);

        return 0;
      });
      break;

    case 'highPrice':
      sorted.sort((a, b) => {
        const getRank = (option: number) => {
          if (option === 0) return 0; // Paid
          if (option === 1) return 1; // Free
          return 2; // View Only
        };

        const rankA = getRank(a.pricingOption);
        const rankB = getRank(b.pricingOption);

        if (rankA !== rankB) return rankA - rankB;

        if (rankA === 0) return (b.price ?? 0) - (a.price ?? 0);

        return 0;
      });
      break;
  }

  return sorted;
}
