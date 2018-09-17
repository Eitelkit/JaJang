import {Component, Input} from '@angular/core';
import {Product} from '../models/product';
import {ShoppingCart} from '../models/shopping-cart';
import {ActivatedRoute} from '@angular/router';
import {UserShoppingCartsService} from '../user-shopping-carts.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product: Product; // product
  @Input() showActions = true; // whether show the quantity control or not
  @Input() shoppingCart: ShoppingCart; // user shopping cart
  restuarantId: string; // store the restaurant id
  constructor(private userCartService: UserShoppingCartsService,
              private route: ActivatedRoute) {
    this.restuarantId = route.snapshot.paramMap.get('id'); // get the restaurant id
  }
  async addToCart() { // add the product to the shopping cart
    this.userCartService.addToCart(this.restuarantId, this.product);
  }
}
