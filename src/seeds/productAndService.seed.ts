import { ProductAndService } from 'src/entities';
import { productServiceCategoryEnum } from 'src/entities/ProductAndService';

export const productServiceSeed: ProductAndService[] = [
  {
    name: 'Software As A Service',
    shortName: 'SAAS',
    category: productServiceCategoryEnum.SERVICE,
  },
  {
    name: 'Electronic Commerce',
    shortName: 'E-COMMERCE',
    category: productServiceCategoryEnum.SERVICE,
  },
  {
    name: 'Crypto Currency',
    shortName: 'CRYPTO',
    category: productServiceCategoryEnum.PRODUCT,
  },
];
