import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Product} from './models/product';
import {Menu} from './models/menu';

@Injectable()
export class PaperMenuService {
  constructor(private db: AngularFireDatabase) { }
  createMenu(restaurantId: string) { // create a menu according to the restaurant id
    return this.db.list('/restaurants/' + restaurantId + '/menus/')
      .push({
        date: new Date().getTime() // push the new date to the database
      });
  }
  deleteMenu(menuId: string, restaurantId: string) { // delete a certain menu according to the menu id and restaurant id
    this.db.object('/restaurants/' + restaurantId + '/menus/' + menuId)
      .remove(); // remove the menu from the database
  }
  addFoodItem(menuId: string, restaurantId: string, product: Product) {
    // add food item to a certain menu according the menu id and restaurant id
    this.db.list('/restaurants/' + restaurantId + '/menus/' + menuId + '/menuItems/')
      .push({
        type: 'food', // update the item type
        name: product.title, // update the product title
        price: product.price, // update the product price
      });
  }
  delete(menuItemId: string, menuId: string, restaurantId: string) {
    // delete a certain menu item from the menu
    this.db.object('/restaurants/' + restaurantId + '/menus/' + menuId + '/menuItems/' + menuItemId).remove();
  }
  getMenu(menuId: string, restaurantId: string) { // get a certain menu according to the menu id and restaurant id
    return this.db.object<Menu>('/restaurants/' + restaurantId + '/menus/' + menuId)
      .snapshotChanges().map( menu => {
        if (menu !== null) { // if the menu exists
          return new Menu(menu.payload.val(), menu.key); // return a new menu (including its values and key)
        } else { // if the menu does not exist
          return new Menu(); // return an empty menu
        }
      });

  }
  getAllMenus(restaurantId: string) { // get all menus for the restaurant
    return this.db.list('/restaurants/' + restaurantId + '/menus/')
      .snapshotChanges().map(menus => {
        return menus.map( menu => {
          if (menu !== null) { // if the menu exist
            return new Menu(menu.payload.val(), menu.key); // return the menu object
          } else { // if the menu does not exist
            return new Menu(); // return an empty menu object
          }
        });
    });
  }
}
