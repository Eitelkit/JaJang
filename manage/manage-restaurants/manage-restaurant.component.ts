import {Component, OnDestroy, OnInit} from '@angular/core';
import {RestaurantService} from '../../restaurant.service';
import {Subscription} from 'rxjs/Subscription';
import {Restaurant} from '../../models/restaurant';
import {DataTableResource} from 'angular5-data-table';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-manage-restaurant',
  templateUrl: './manage-restaurant.component.html',
  styleUrls: ['./manage-restaurant.component.css']
})
export class ManageRestaurantComponent implements OnDestroy, OnInit {
  restaurants: Restaurant[] = []; // store the restaurant information
  tableResource: DataTableResource<Restaurant>; // for data table
  items: Restaurant[] = []; // for data table
  itemCount: number; // the number of items
  uid: string; // store the user id
  private subsription: Subscription; // used for unsubscribe
  constructor(private restaurantService: RestaurantService,
              private auth: AuthService) {
    this.auth.user$.subscribe( user => { // get the user
      this.subsription = restaurantService.getAllForOne(user.uid)
        .subscribe(restaurant => {
          this.restaurants = restaurant; // get the restaurant
          this.initializeTable(restaurant); // initialize the data table
        });
    });

  }
  filter(query: string) { // filter the data table
    const filterRestaurant = (query) ?
      this.restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(query.toLowerCase())) // case unsensative
      : this.restaurants;
    this.initializeTable(filterRestaurant); // initialize the table after filtering the restaurant
  }
  private initializeTable(restaurants: Restaurant[]) { // initialize the data table
    this.tableResource = new DataTableResource<Restaurant>(restaurants); // create a new data table object
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items); // get the items
    this.tableResource.count()
      .then(count => this.itemCount = count); // get the number of items
  }
  reloadItems(params) { // reload the data table
    if (this.tableResource) { // if the data table exists
      this.tableResource.query(params)
        .then(items => this.items = items); // get the items
    }
  }
  delete(restaurantId) {
    if (confirm('Are you sure you want to delete this product?')) { // ask for confirmation
      this.restaurantService.delete(restaurantId); // delete the restaurant
    }
  }
  ngOnDestroy() {
    this.subsription.unsubscribe(); // unsubscribe
  }
  ngOnInit() {
  }

}
