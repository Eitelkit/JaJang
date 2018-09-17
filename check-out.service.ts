import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Order} from './models/order';

@Injectable()
export class CheckOutService {
  constructor(private db: AngularFireDatabase) { }

  createOrder(restaurantId: string) { // create a new order for restaurant
    return this.db.list('/restaurants/' + restaurantId + '/orders/')
      .push( {
        date: new Date().getTime() // push the created time to the new restaurant
      });
  }

  private getOrder(restaurantId: string, orderKey: string) { // get the order to the restaurnat
    return this.db.object('/restaurants/' + restaurantId + '/orders/' + orderKey);
    // get order from the database with the url
  }

  async placeOrder(order: Order) { // place the order to the restaurant, the restaurant id is stored in the order object
    const orderKey = (await this.createOrder(order.restaurantId)).key;
    // store the order id
    this.getOrder(order.restaurantId, orderKey).update(
      {shipping: order.shipping}
    );
    for (const index in order.items) {
      if (true) {
        this.db.object('/restaurants/' + order.restaurantId + '/orders/' + orderKey + '/items/' + order.items[index].key)
          .update({
                          imageUrl: order.items[index].imageUrl,
                          price: order.items[index].price,
                          quantity: order.items[index].quantity,
                          title: order.items[index].title
                        });
      } // update the order information in database
    }
  }

  getOneOrder(restuarantId: string, orderId: string) { // get the order according to the order id and restaurant id
    return this.db.object<Order>('/restaurants/' + restuarantId + '/orders/' + orderId)
      .snapshotChanges().map( order => {
        if (order !== null) { // if the the order exists
          return new Order(order.payload.val(), order.key); // get the order values and key(id)
        } else {
          return new Order(); // or return an empty order object
        }
      });
  }
  getAllOrders(restuarantId: string) { // get all orders according to the restaurant id
    return this.db.list<Order>('/restaurants/' + restuarantId + '/orders/')
      .snapshotChanges().map( orders => { // get all orders
        return orders.map( order => { // map to one order
          if (order !== null) { // if the order exists
            return new Order(order.payload.val(), order.key); // return order( including values and key)
          } else {
            return new Order(); // or return an empty object
          }
        });
    });
  }
}
