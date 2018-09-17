import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Product} from './models/product';

@Injectable()
export class ProductService {
  constructor(private db: AngularFireDatabase) { }
  create(product) { // create a new product in database
    return this.db.list('/products').push(product);
    // push the product in the database
  }
  getAll() { // get all products in database
    return this.db.list<Product>('/products')
      .snapshotChanges().map(products => {
        return products.map( product => {
          const rs = product.payload.val(); // the values of product
          rs.key = product.key; // the key(id) of product
          return rs; // return the product object
        });
      });
  }
  get(productID) { // get a certain product according to the product id
    return this.db.object<Product>('/products/' + productID)
      .snapshotChanges().map( product => {
        const rs = product.payload.val(); // the values of the product
        rs.key = product.key; // the key of the product
        return rs; // return the product object
      });
  }
  update(productID, product) { // update a certain product
    this.db.object('/products/' + productID).update(product);
  }
  delete(productID) { // delete a kind of product
    this.db.object('/products/' + productID).remove();
  }
}
