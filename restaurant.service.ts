import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Restaurant} from './models/restaurant';

@Injectable()
export class RestaurantService {
  constructor(private db: AngularFireDatabase) { }
  create(uid, restaurant) { // create a new restaurant under a certain user
    this.db.list('restaurants').push(restaurant);
    // push the new restaurant to the database
  }
  getAll() { // get all restaurants
    return this.db.list<Restaurant>('/restaurants').snapshotChanges()
      .map(restaurants => { // get all restaurants
        return restaurants.map(restaurant => { // map to a certain restaurant
          const rs = restaurant.payload.val(); // values of restaurant
          rs.key = restaurant.key; // the key of restaurant
          return rs; // return the restaurant object
        } );
      });
  }
  getAllForOne(uid) { // get all restaurants for a certain user
    return this.db.list<Restaurant>('/restaurants', ref => ref.orderByChild('ownerId').equalTo(uid))
      .snapshotChanges().map(restaurants => { // get all restaurants
        return restaurants.map(restaurant => {
          const rs = restaurant.payload.val(); // the values of restaurant
          rs.key = restaurant.key; // the key of restaurant
          return rs; // return the restaurant object
        } );
      });
  }
  get(restaurantId) { // get a certain restaurant
    return this.db.object<Restaurant>('restaurants/' + restaurantId)
      .snapshotChanges().map(restaurant => { // get restaurant
          const rs = restaurant.payload.val(); // the values of the restaurant
          rs.key = restaurant.key; // the key of the restaurant
          return rs; // return the restaurant object
      } );
  }
  update(restaurantId, restaurant) { // update the information of a certain restaurant
    // this.db.object('users/' + uid + '/restaurants/' + restaurantId).update(restaurant);
    this.db.object('restaurants/' + restaurantId).update(restaurant);
    // update in the database
  }
  delete(restaurantId) { // delete a certain restaurant according to the restaurant id
    // this.db.object('users/' + uid + '/restaurants/' + restaurantId).remove();
    this.db.object('restaurants/' + restaurantId).remove();
    // remove the restaurant from the database
  }
  growSize(restaurantId: string) {
    // grow the table card size
    this.db.object<number>('/restaurants/' + restaurantId + '/size')
      .valueChanges().take(1).subscribe( s => {
      if (s !== null) {
        this.db.object('/restaurants/' + restaurantId )
          .update({
            size: (((s + 50) < 601) ? (s + 50) : s)
          });
      } else {
        this.db.object('/restaurants/' + restaurantId )
          .update({
            size: 300
          });
      }

    });
  }
  shrinkSize(restaurantId: string) {
    this.db.object<number>('/restaurants/' + restaurantId + '/size')
      .valueChanges().take(1).subscribe( s => {
      console.log(s);
      if (s !== null) {
        this.db.object('/restaurants/' + restaurantId )
          .update({
            size: (((s - 50) > 99) ? (s - 50) : s)
          });
      } else {
        this.db.object('/restaurants/' + restaurantId )
          .update({
            size: 300
          });
      }

    });
  }
}
