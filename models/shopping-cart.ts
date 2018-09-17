import {ShoppingCartItem} from './shopping-cart-item';
import {Product} from './product';

export class ShoppingCart {
  quantity;
  items: ShoppingCartItem[] = [];
  constructor(private itemsMap: { [key: string]: any }, public restuarantId: string) {
    this.itemsMap = itemsMap || {};
    for (const productId in itemsMap) {
      if (itemsMap.hasOwnProperty(productId)) {
        const item = itemsMap[productId];
        this.items.push(new ShoppingCartItem({ ...item, key: productId }));
      }
    }
    this.restuarantId = restuarantId;
  }
  get totalItemsCount(): number {
    let count = 0;
    for (const productId in this.itemsMap) {
      if (this.itemsMap.hasOwnProperty(productId)) {
        count += this.itemsMap[productId].quantity;
      }
    }
    return count;
  }
  get totalPrice() {
    let sum = 0;
    for (const productId in this.items) {
      if (true) {
        sum += this.items[productId].totalPrice;
      }
    }
    return sum;
  }
  getQuantity(product: Product) {
    const item = this.itemsMap[product.key];
    return (item) ? item.quantity : 0;
  }
}
