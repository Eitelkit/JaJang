import {Component, OnInit} from '@angular/core';
import {RestaurantProductService} from '../restaurant-product.service';
import {ActivatedRoute} from '@angular/router';
import {PaperMenuService} from '../paper-menu.service';
import {Product} from '../models/product';

@Component({
  selector: 'app-products-sidebar',
  templateUrl: './products-sidebar.component.html',
  styleUrls: ['./products-sidebar.component.css']
})
export class ProductsSidebarComponent implements OnInit {
  products$; // store the product (observable)
  restId: string; // store the restaurant id
  menuId: string; // store the menu id
  constructor(private productService: RestaurantProductService, // product service
              private route: ActivatedRoute, // used for getting information from url
              private paperMenuService: PaperMenuService) { // paper menu service
    this.restId = this.route.parent.snapshot.url[1].toString(); // get the restaurant id
    this.products$ = this.productService.getAll(this.restId); // get the product (observable)
    this.menuId = this.route.snapshot.paramMap.get('menuId'); // get the menu id from the parameter map
  }
  addFoodItem(product: Product) {
    this.paperMenuService.addFoodItem(this.menuId, this.restId, product);
    // add food item to db
  }
  ngOnInit() {
  }
}
