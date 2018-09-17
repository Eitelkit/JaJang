import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {DataTableResource} from 'angular5-data-table';
import {Restaurant} from '../../models/restaurant';
import {RestaurantService} from '../../restaurant.service';

@Component({
  selector: 'app-admin-restaurants',
  templateUrl: './admin-restaurants.component.html',
  styleUrls: ['./admin-restaurants.component.css']
})
export class AdminRestaurantsComponent implements OnDestroy {
  restaurants: Restaurant[];
  tableResource: DataTableResource<Restaurant>;
  items: Restaurant[] = [];
  itemCount: number;
  private subsription: Subscription;
  constructor(private restaurantService: RestaurantService) {
    this.subsription = restaurantService.getAll()
      .subscribe(restaurant => {
        this.restaurants = restaurant;
        this.initializeTable(restaurant);
      });
  }
  filter(query: string) {
    const filterRestaurant = (query) ?
      this.restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(query.toLowerCase()))
      : this.restaurants;
    this.initializeTable(filterRestaurant);
  }
  private initializeTable(restaurants: Restaurant[]) {
    this.tableResource = new DataTableResource<Restaurant>(restaurants);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }
  reloadItems(params) {
    if (this.tableResource) {
      this.tableResource.query(params)
        .then(items => this.items = items);
    }
  }
  ngOnDestroy() {
    this.subsription.unsubscribe();
  }

}
