import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../category.service';
import {Product} from '../../models/product';
import {RestaurantProductService} from '../../restaurant-product.service';

@Component({
  selector: 'app-manage-products-form',
  templateUrl: './manage-products-form.component.html',
  styleUrls: ['./manage-products-form.component.css']
})
export class ManageProductsFormComponent implements OnInit {
  categories$; // store the category information
  product: Product = new Product(); // store the product information
  productId: string; // store the product id
  restaurantId: string; // store the restaurant id
  constructor(
    private router: Router, // router for navigation
    private route: ActivatedRoute, // get the information in url
    private categoryService: CategoryService, // category service
    private restaurantProductService: RestaurantProductService) {
  }
  save(product) { // save the product
    if (this.productId) { // if product id exists
      this.restaurantProductService.update(this.productId, this.restaurantId, product); // update the product
    } else {
      this.restaurantProductService.create(product, this.restaurantId); // create a new product
    }
    this.router.navigate(['../'], { relativeTo: this.route, queryParams: {section: 'Products'} });
    // navigate to the home page and pass the information to query parameter
  }
  delete() { // delete the product information
    if (confirm('Are you sure you want to delete this product?')) { // need user to confirm the deleting
      this.restaurantProductService.delete(this.productId, this.restaurantId); // delete the product
      this.router.navigate(['../'], { relativeTo: this.route, queryParams: {section: 'Products'} });
      // redirect to the parent page
    }
  }
  ngOnInit() {
    this.categories$ = this.categoryService.getAll(); // get the category (observable)
    this.productId = this.route.snapshot.paramMap.get('productId'); // get the product id
    this.route.parent.url.take(1).subscribe(u => {
      this.restaurantId = u[1].toString(); // get the restaurant id
      if (this.productId) {
        this.restaurantProductService.get(this.productId, this.restaurantId).take(1).subscribe(p => this.product = p);
        // get the product
      }
    });
  }
}
