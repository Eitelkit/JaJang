import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Table} from './models/table';
import {ShoppingCartItem} from './models/shopping-cart-item';
import {Order} from './models/order';

@Injectable()
export class HereOrderService {
  constructor(private db: AngularFireDatabase) { }
  generateTable(numOfTable: number, restaurantId: string) { // generate some tables in a restaurant
    let n = 0; // the index of table
    let totalTable = 0; // the number of tables
    this.totalTable(restaurantId).subscribe( ts => {
      totalTable = ts.length;
        while (n < numOfTable) {
          this.db.list('/restaurants/' + restaurantId + '/tables/')
            .push({
              date: new Date().getTime(),
              needCheckOut: false,
              needService: false,
              occupied: false,
              waitFood: false,
              restaurantId: restaurantId,
              index: totalTable + 1 + n,
              size: 300
            });
          n++;
        } // update the table
    }
    );
  }
  generateOrder(tableId: string, restaurantId: string) { // generate the order according to the table id and restaurant id
    return this.db.list('/restaurants/' + restaurantId + '/tables/' + tableId + '/orders/')
      .push({
        date: new Date().getTime(),
        status: 'place order' // update the table information
      });
  }
  changeToOccupy(tableId: string, restaurantId: string) {
    // change the states of table to occupied according to the table id and restaurant id
    this.db.object('/restaurants/' + restaurantId + '/tables/' + tableId)
      .update({
        occupied: true // update the table information
      });
  }
  getAllTable(restaurantId: string) { // get all tables in a certain restaurant
    return this.db.list('/restaurants/' + restaurantId + '/tables/')
      .snapshotChanges().map( tables => {
        return tables.map(table => {
          if (table !== null) { // if the table exists
            return new Table(table.payload.val(), table.key); // return the table object(including the values and key)
          } else {
            return new Table(); // or return an empty table object
          }
        });
    });
  }
  getTable(tableId: string, restaurantId: string) { // get a certain table according to the table id and restaurant id
    return this.db.object('/restaurants/' + restaurantId + '/tables/' + tableId)
      .snapshotChanges().map( table => {
          if (table !== null) { // if the table exists
            return new Table(table.payload.val(), table.key); // return the table (including the values and key)
          } else {
            return new Table(); // or return an empty table
          }
      });
  }
  private finishTable(tableId: string, restaurantId: string) { // finish the services to a certain table
    this.db.object('/restaurants/' + restaurantId + '/tables/' + tableId + '/orders/').remove();
    this.db.object('/restaurants/' + restaurantId + '/tables/' + tableId)
      .update({
        needCheckOut: false,
        needService: false,
        occupied: false,
        waitFood: false // update the table information
      });
  }
  deleteOneTable(tableId: string, restaurantId: string) { // delete a certain table according to the table id and restaurant id
    this.db.object('/restaurants/' + restaurantId + '/tables/' + tableId)
      .remove(); // remove the table from the database
  }
  needCheckOut(tableId: string, restaurantId: string) { // change a certain table's state to the 'need check out'
    this.db.object('/restaurants/' + restaurantId + '/tables/' + tableId)
      .update(
        {
          needCheckOut: true, // update the table state
        }
      );
  }
  finishCook(tableId: string, restaurantId: string) { // change a certain table's state to finished
    this.db.object('/restaurants/' + restaurantId + '/tables/' + tableId)
      .update(
        {
          waitFood: false // update the table information
        }
      );
  }
  needService(tableId: string, restaurantId: string) { // change a certain tables's state to need service
    this.db.object('/restaurants/' + restaurantId + '/tables/' + tableId)
      .update(
        {
          needService: true // update the table information
        }
      );
  }
  completeService(tableId: string, restaurantId: string) { // change a certain table's state to completed
    this.db.object('/restaurants/' + restaurantId + '/tables/' + tableId)
      .update(
        {
          needService: false // update the table information
        }
      );
  }
  placeOrder(tableId: string, restaurantId: string, items: ShoppingCartItem[]) {
    // place order to a certain table
    this.db.object('/restaurants/' + restaurantId + '/tables/' + tableId)
      .update(
        {
          waitFood: true // update the table information
        }
      );
    this.generateOrder(tableId, restaurantId).then( orderId => {
      // generate the order and update the table's state
      for (const index in items) {
        if (true) {
          this.db.object('/restaurants/' + restaurantId + '/tables/' + tableId + '/orders/' + orderId.key + /items/ + items[index].key)
            .update({
              imageUrl: items[index].imageUrl,
              price: items[index].price,
              quantity: items[index].quantity,
              title: items[index].title,
              status: 'cooking'
            });
        }
      }
    });
  }
  getAllOrdersForTable(tableId: string, restaurantId: string) { // get all orders for a certain table
    return this.db.list<Order>('/restaurants/' + restaurantId + '/tables/' + tableId + '/orders/')
      .snapshotChanges().map(orders => {
        return orders.map( order => {
          if ( order !== null ) { // if the order exists
            return new Order(order.payload.val(), order.key); // return the order (including the values and key)
          } else {
            return new Order(); // or return an empty order
          }
        });
    });
  }
  getAllFinishedOrders(restaurantId: string) { // get all finished order for a certain restaurant
    return this.db.list<Order>('/restaurants/' + restaurantId + '/finishedOrders/')
      .snapshotChanges().map(orders => {
        return orders.map( order => {
          if ( order !== null ) { // if the order exists
            return new Order(order.payload.val(), order.key); // return the order values and key
          } else {
            return new Order(); // or return an empty order
          }
        });
      });
  }
  getFinishedOrders( orderId: string, restaurantId: string) { // get finished order
    return this.db.object('/restaurants/' + restaurantId + '/finishedOrders/' + orderId)
      .snapshotChanges().map(order => {
        if (order !== null) { // if the order exists
          return new Order(order.payload.val(), order.key); // return an object (including the values and key)
        } else {
          return new Order(); // or return the new order
        }
      });
  }
  changeOrderStatusToCooking(orderId: string, tableId: string, restaurantId: string) {
    // change a certain order's status to 'cooking'
    this.db.object('/restaurants/' + restaurantId + '/tables/' + tableId + '/orders/' + orderId)
      .update({
        status: 'cooking' // update in database
      });
  }
  changeOrderStatusToCooked(orderId: string, tableId: string, restaurantId: string) {
    // change a certain order's status to 'cooked'
    this.db.object('/restaurants/' + restaurantId + '/tables/' + tableId + '/orders/' + orderId)
      .update({
        status: 'cooked' // update in database
      });
  }
  finishOrders(tableId: string, restaurantId: string) {
    // finish the orders of a certain table
    this.getAllOrdersForTable(tableId, restaurantId).take(1).subscribe( orders => {
      for (const order in orders) {
        if (true) {
          this.db.object('/restaurants/' + restaurantId + '/finishedOrders/' + orders[order].key)
            .update({
              restaurantId: orders[order].restaurantId,
              date: orders[order].date, // update the information of table in database
            });
          const items = orders[order].items;
          for (const itemIndex in items) {
            if (true) {
              this.db.object('/restaurants/' + restaurantId + '/finishedOrders/' + orders[order].key + '/items/' + items[itemIndex].key)
                .update({
                  title: items[itemIndex].title,
                  imageUrl: items[itemIndex].imageUrl,
                  price: items[itemIndex].price,
                  quantity: items[itemIndex].quantity
                }); // add these informatio to finished order in database
            }
          }
        }
      }
      this.finishTable(tableId, restaurantId);
    }
    );
  }
  private totalTable(restaurantId: string) {
    return this.db.list<string>('/restaurants/' + restaurantId + '/tables/')
      .snapshotChanges();
  }

}
