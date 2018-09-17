import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {UserShoppingCart} from './models/user-shopping-cart';
import {Product} from './models/product';
import {ShoppingCart} from './models/shopping-cart';

@Injectable()
export class UserShoppingCartsService {
  constructor(private db: AngularFireDatabase) { }
  /* create user's shopping cart for all restaurants */
  create() {
    return this.db.list('/shopping-carts/')
      .push( {
      lastChangedTime: new Date().getTime()
    });
  }

  /* get or create user cart id*/
  private async getOrCreateUserCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) { return cartId; }

    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  /* get user cart from the database */
  async getUserCart(): Promise<Observable<UserShoppingCart>> {
    const cartId = await this.getOrCreateUserCartId();
    return this.db.object<UserShoppingCart>('/shopping-carts/' + cartId)
      .snapshotChanges()
      .map(userShoppingCart => {
        if (userShoppingCart.payload.val() !== null) {
          return new UserShoppingCart(userShoppingCart.payload.val());
        } else {
          return new UserShoppingCart({});
        }
      });
  }
  /* get cart for a certain restaurant*/
  async getCart(restaurantId: string): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateUserCartId();
    return this.db.object('/shopping-carts/' + cartId + '/' + restaurantId)
      .snapshotChanges()
      .map(x => {
        if (x.payload.val() !== null) {
          return new ShoppingCart(x.payload.val().items, restaurantId);
        } else {
          return new ShoppingCart({}, restaurantId);
        }
      });
  }

  /* get item from a certain cart */
  private getItem(restuarantId: string, cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/' + restuarantId + '/items/' + productId);
  }

  /* update section: */
  /* add product to the cart */
  async addToCart(restuarantId, product: Product) {
    this.updateItem(restuarantId, product, 1);
  }

  /* remove the product from the cart */
  async removeFromCart(restuarantId, product: Product) {
    this.updateItem(restuarantId, product, -1);
  }

  /* clear a cart for a restaurant */
  async clearCart(restaurantId) {
    const cartId = await this.getOrCreateUserCartId();
    this.db.object('/shopping-carts/' + cartId + '/' + restaurantId).remove();
  }

  /* clear all the carts (user cart) */
  async clearUserCart() {
    const cartId = await this.getOrCreateUserCartId();
    this.db.object('/shopping-carts/' + cartId).remove();
  }

  private async updateItem(restuarantId: string, product: Product, change: number) {
    const cartId = await this.getOrCreateUserCartId();
    const item$ = this.getItem(restuarantId, cartId, product.key);
    item$.snapshotChanges().take(1).subscribe(item => {
      let quantity = change;
      if ( item.payload.val() !== null) {
        quantity += item.payload.val().quantity;
      }
      if (quantity === 0) {
        item$.remove();
      } else { item$.update({
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: quantity
      }); }
    });
  }
}
