import {Product} from './product';
import {ShoppingCart} from './shopping-cart';

export class UserShoppingCart {
  carts: ShoppingCart[] = [];
  quantity = 0;
  constructor(private cartsMap: { [key: string]: any }) {
    this.cartsMap = cartsMap || {};
    for (const key in cartsMap) {
      if (key !== 'quantity' && key !== 'lastChangedTime') {
        const shoppingCart = cartsMap[key];
        this.carts.push(new ShoppingCart(shoppingCart.items, key));
      } else {
        this.quantity = cartsMap[key];
      }
    }
  }
  get totalItemsCount() {
    let count = 0;
    for (const cart in this.carts) {
      if ( true ) {
        count += this.carts[cart].totalItemsCount;
      }
    }
    return count;
  }
  get totalPrice() {
    return -1;
  }
}
