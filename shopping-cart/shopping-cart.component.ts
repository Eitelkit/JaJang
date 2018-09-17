import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserShoppingCartsService} from '../user-shopping-carts.service';
import {RestaurantService} from '../restaurant.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HereOrderService} from '../here-order.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  @Input() restaurantId; // input: restaurant id
  cart$; // user shopping cart (observable)
  restaurantName: string; // restaurant name
  tableId: string; // store the table id
  private subscription1: Subscription; // used for unsubscribe
  private subscription2: Subscription; // used for unsubscribe
  constructor(private userCartService: UserShoppingCartsService, // user shopping cart service
              private restaurantService: RestaurantService, // restaurant service
              private hereService: HereOrderService, // mobile service
              private route: ActivatedRoute, // used for getting information from url
              private router: Router) { // used for navigation
  }
  clearCart() {
    this.userCartService.clearCart(this.restaurantId); // clear the items in the cart
  }
  placeOrder(items) { // place the order
    this.hereService.placeOrder(this.tableId, this.restaurantId, items);
    this.clearCart();
    this.router.navigate(['/in-restaurant-service'], { queryParams: {tableKey: this.tableId, restaurantId: this.restaurantId}});
  }
  async ngOnInit() {
    this.cart$ = await this.userCartService.getCart(this.restaurantId);
    // get the shopping cart (observable)
    this.subscription1 = this.restaurantService.get(this.restaurantId)
      .subscribe( r => {
        this.restaurantName = r.name; // get the restaurant name
      });
    this.subscription2 = this.route.queryParamMap
      .subscribe(q => {
        this.tableId = q.get('tableKey'); // get the table id
      });
  }
  ngOnDestroy() {
    this.subscription1.unsubscribe(); // unsubscribe
    this.subscription2.unsubscribe(); // unsubscribe
  }
}
