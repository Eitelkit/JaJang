import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll() { // get all categories in the database
    return this.db.list('/categories', query => query.orderByChild('name'))
      .snapshotChanges().map(categories => {
        return categories.map(category => {
          const rs = category.payload.val(); // get value
          rs.$key = category.key; // get key
          return rs; // return the object
        });
      });
  }

}
