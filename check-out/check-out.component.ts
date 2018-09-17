import {Shipping} from '../models/shipping';
import { Component, OnInit } from '@angular/core';
import {Order} from '../models/order';
import {UserShoppingCartsService} from '../user-shopping-carts.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CheckOutService} from '../check-out.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  shipping: Shipping = new Shipping(); // store the shipping information
  order: Order = new Order(); // store the order information
  resturantId: string; // restaurant id
  constructor(private cartService: UserShoppingCartsService,
              private checkOutService: CheckOutService,
              private route: ActivatedRoute,
              private router: Router) {
    this.resturantId = this.route.snapshot.paramMap.get('restId'); // get the restaurant id from the parameter map
  }
  async ngOnInit() {
    (await this.cartService.getCart(this.resturantId))
      .subscribe( cart => {
        this.order.items = cart.items; // get the cart and put the items in the cart to the order object
      });
  }
  placeOrder(shipping: Shipping) { // used for place order
      this.order.shipping = shipping; // add the shipping information to the order object
      this.order.restaurantId = this.resturantId; // add the restaurant id to the order object
      this.checkOutService.placeOrder(this.order).then( x => {
        this.cartService.clearCart(this.resturantId); // clear the user cart when place the order
        this.router.navigateByUrl('/shopping-cart'); // redirect to the shopping cart component
      }
      );

  }

}
