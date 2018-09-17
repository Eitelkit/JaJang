import { Component } from '@angular/core';
import { Restaurant } from '../models/restaurant';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent {
  restaurants: Restaurant[] = []; // store the restaurant information
  constructor(private restaurantService: RestaurantService) {
    this.populateRestaurant();
  }
  private populateRestaurant() {
    this.restaurantService.getAll().subscribe( restaurants => {
      this.restaurants = restaurants; // get the restaurants
    });
  }
}
