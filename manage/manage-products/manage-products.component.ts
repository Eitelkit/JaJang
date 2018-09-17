import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Product} from '../../models/product';
import {DataTableResource} from 'angular5-data-table';
import {RestaurantProductService} from '../../restaurant-product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnDestroy, OnInit {
  products: Product[] = []; // store the products information
  tableResource: DataTableResource<Product>; // used for data table
  items: Product[] = []; // used for data table
  itemCount: number; // the number of count
  restaurantId: string; // store the restaurant id
  private subsription: Subscription; // used for unsubscribe
  constructor(private restaurantProductService: RestaurantProductService,
              private route: ActivatedRoute) {
  }
  filter(query: string) { // used for filter the data table
    const filterProducts = (query) ? // filter the data table
      this.products.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase())) // all to lower case for case non-sense
      : this.products;
    this.initializeTable(filterProducts); // reload the data table after filter the data table
  }
  private initializeTable(products: Product[]) { // for data table
    this.tableResource = new DataTableResource<Product>(products); // new data table object
    this.tableResource.query({ offset: 0})
      .then(items => this.items = items); // get the items
    this.tableResource.count()
      .then(count => this.itemCount = count); // get the number of count
  }
  reloadItems(params) { // reload the data table
    if (this.tableResource) {
      this.tableResource.query(params)
        .then(items => this.items = items); // get the items
    }
  }
  ngOnDestroy() {
    this.subsription.unsubscribe(); // unsubscribe avoid memory leak
  }
  ngOnInit() {
    this.restaurantId = this.route.parent.snapshot.url[1].toString(); // get the restaurant id
    this.subsription = this.restaurantProductService.getAll(this.restaurantId)
      .subscribe( products => {
        this.products = products; // get the products
        this.initializeTable(products); // initialize the data table
      });
  }

}
