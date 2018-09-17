import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Product} from './models/product';

@Injectable()
export class RestaurantProductService {
  constructor(private db: AngularFireDatabase) { }
  create(product, restaurantId) {
    return this.db.list('/restaurants/' + restaurantId + '/products/').push(product);
  }
  getAll(restaurantId) {
    return this.db.list<Product>('/restaurants/' + restaurantId + '/products/')
      .snapshotChanges().map( products => {
        return products.map(product => {
          const rs: Product = product.payload.val();
          rs.key = product.key;
          return rs;
        });
      });
  }
  get(productId, restaurantId) {
    return this.db.object('/restaurants/' + restaurantId + '/products/' + productId)
      .snapshotChanges().map( product => {
        const rs = product.payload.val();
        rs.key = product.key;
        return rs;
        }
      );
  }
  update(productId, restaurantId, product) {
    this.db.object('/restaurants/' + restaurantId + '/products/' + productId).update(product);
  }
  delete(productId, restaurantId) {
    this.db.object('/restaurants/' + restaurantId + '/products/' + productId).remove();
  }
}
