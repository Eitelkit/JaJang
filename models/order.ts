import {Shipping} from './shipping';
import {ShoppingCartItem} from './shopping-cart-item';

export class Order {
  key: string;
  restaurantId = '';
  items: ShoppingCartItem[] = [];
  shipping: Shipping;
  date: Date;
  status: string;
  get totalPrice(): number {
    let total = 0;
    for (const index in this.items) {
      if (true) {
        total += this.items[index].price * this.items[index].quantity;
      }
    }
    return total;
  }
  constructor(private map?: {[key: string]: any}, private orderKey?: string) {
    for (const key in map) {
      if (map.hasOwnProperty(key)) {
        if (key === 'date') {
          this.date = map[key];
        } else if (key === 'shipping') {
          this.shipping = map[key];
        } else if (key === 'status') {
          this.status = map[key];
        } else if (key === 'restaurantId') {
          this.restaurantId = map[key];
        } else if (key === 'items') {
          for (const productId in map[key]) {
            if (true) {
              const temp = map[key][productId];
              temp.key = productId;
              this.items.push(temp);
            }
          }
        }
      }
    }
    this.key = orderKey;
  }
}
