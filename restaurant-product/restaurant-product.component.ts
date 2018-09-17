import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShoppingCart} from '../models/shopping-cart';
import {ActivatedRoute} from '@angular/router';
import {ShoppingCartService} from '../shopping-cart.service';
import {Observable} from 'rxjs/Observable';
import {Product} from '../models/product';
import {RestaurantProductService} from '../restaurant-product.service';
import {RestaurantService} from '../restaurant.service';
import {UserShoppingCartsService} from '../user-shopping-carts.service';
import {HereOrderService} from '../here-order.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-restaurant-product',
  templateUrl: './restaurant-product.component.html',
  styleUrls: ['./restaurant-product.component.css']
})
export class RestaurantProductComponent implements OnInit, OnDestroy {
  restaurantId: string; // store the restaurant id
  restaurantName: string; // store the restaurant name
  products: Product[] = []; // store the products information
  filteredProducts: Product[] = []; // store the filter products information
  category; // store the category
  cart$: Observable<ShoppingCart>; // store the cart information (observable)
  products$; // store the product information (observable)
  tableId; // store the table id
  private subscription: Subscription; // used for unsubscribe
  constructor(
    private route: ActivatedRoute, // used for getting information from url
    private restaurantProductService: RestaurantProductService, // product service
    private shoppingCartService: ShoppingCartService, // shopping cart service
    private userCartService: UserShoppingCartsService, // user shopping cart service
    private restaurantService: RestaurantService, // restaurant service
    private hereOrderService: HereOrderService) { // mobile service
  }
  async ngOnInit() {
    this.restaurantId = this.route.snapshot.paramMap.get('id'); // get the restaurant id
    this.subscription = this.restaurantService.get(this.restaurantId)
      .subscribe( restaurant => {
        this.restaurantName = restaurant.name; // get the restaurant name
      });
    this.tableId = this.route.snapshot.queryParamMap.get('tableKey'); // get the table id
    if (this.tableId !== null) {
      this.hereOrderService.changeToOccupy(this.tableId, this.restaurantId);
      // change the table status to occupied
    }
    this.cart$ = (await this.userCartService.getCart(this.restaurantId)); // get the cart (observable)
    this.populateProduct(); // create product
  }
  ngOnDestroy() {
    this.subscription.unsubscribe(); // unsubscribe
  }
  private populateProduct() {
    this.products$ = this.restaurantProductService
      .getAll(this.route.snapshot.url.pop().toString());
    this.products$.switchMap( p => {
      this.products = p; // get the product
      return this.route.queryParamMap;
    }).subscribe( param => {
      this.category = param.get('category'); // get the category
      this.applyFilter(); // filter
    });
  }
  private applyFilter() {
    this.filteredProducts = (this.category) ? this.products
      .filter(product => product.category === this.category) : this.products;
  }
}
