import {Component, Input} from '@angular/core';
import {Product} from '../models/product';
import {UserShoppingCartsService} from '../user-shopping-carts.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input() product: Product; // product
  @Input() shoppingCart; // user shopping cart
  @Input() restuarantId; // restaurant id
  constructor(private userCartService: UserShoppingCartsService) {
  }
  addToCart() { // add the product to shopping cart
    this.userCartService.addToCart(this.restuarantId, this.product);
  }
  removeFromCart() { // remove the product from the shopping cart
    this.userCartService.removeFromCart(this.restuarantId, this.product);
  }
}
