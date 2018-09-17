import { Component, OnInit } from '@angular/core';
import {UserShoppingCartsService} from '../user-shopping-carts.service';

@Component({
  selector: 'app-user-shopping-carts',
  templateUrl: './user-shopping-carts.component.html',
  styleUrls: ['./user-shopping-carts.component.css']
})
export class UserShoppingCartsComponent implements OnInit {
  carts$; // store the user shopping cart (observable)
  constructor(private userCartService: UserShoppingCartsService) { }
  async ngOnInit() {
    this.carts$ = await this.userCartService.getUserCart(); // get the user shopping cart
  }
  remove() {
    this.userCartService.clearUserCart(); // clear the shopping cart information
  }
}
