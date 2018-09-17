import {Product} from './product';

export class Restaurant {
  constructor() {}
  key: string;
  name: string;
  address: string;
  description: string;
  imageUrl: string;
  ownerId: string;
  ownerName: string;
  contactInfo: string;
  applyStatus: string;
  products: Product[];
  orders;
  size;
}
