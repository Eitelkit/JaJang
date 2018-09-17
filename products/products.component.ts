import { Component, OnInit } from '@angular/core';
import {ProductService} from '../product.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../models/product';
import 'rxjs/add/operator/switchMap';
import {ShoppingCartService} from '../shopping-cart.service';
import {Observable} from 'rxjs/Observable';
import {ShoppingCart} from '../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = []; // products
  filteredProducts: Product[] = []; // filtered products
  category; // category
  cart$: Observable<ShoppingCart>; // get the shopping cart (observable)
  constructor(
    private route: ActivatedRoute, // used for getting information from url
    private productService: ProductService) { // product service
  }
  async ngOnInit() {
    this.populateProduct(); // create the product
  }
  private populateProduct() { // create the product
    this.productService.getAll().switchMap( p => {
      this.products = p; // get product
      return this.route.queryParamMap; // query parameter map
    }).subscribe( param => {
      this.category = param.get('category'); // get category
      this.applyFilter(); // apply the filter
    });
  }
  private applyFilter() {
    this.filteredProducts = (this.category) ? this.products
      .filter(p1 => p1.category === this.category) : this.products;
  }
}
