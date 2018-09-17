import {ShoppingCartItem} from './shopping-cart-item';

export class Table {
  key: string;
  index: string;
  restaurantId: string;
  items: ShoppingCartItem[] = [];
  needCheckOut: boolean;
  needService: boolean;
  occupied: boolean;
  waitFood: boolean;
  date: Date;
  get totalPrice() {
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
        } else if (key === 'needCheckOut') {
          this.needCheckOut = map[key];
        }  else if (key === 'waitFood') {
          this.waitFood = map[key];
        } else if (key === 'occupied') {
          this.occupied = map[key];
        } else if (key === 'needService') {
          this.needService = map[key];
        } else if (key === 'index') {
          this.index = map[key];
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
