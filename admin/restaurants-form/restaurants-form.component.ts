import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Restaurant} from '../../models/restaurant';
import {RestaurantService} from '../../restaurant.service';

@Component({
  selector: 'app-restaurants-form',
  templateUrl: './restaurants-form.component.html',
  styleUrls: ['./restaurants-form.component.css']
})
export class RestaurantsFormComponent implements OnInit {  // restaurant: Restaurant;
  id: string;
  restaurant: Restaurant;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private restaurantService: RestaurantService) {
  }
  save(restaurant) {
    this.restaurantService.update(this.id, restaurant);
    this.router.navigate(['/admin/restaurants']);
  }
  delete() {
    if (confirm('Are you sure you want to delete this product?')) {
      this.restaurantService.delete(this.id);
      this.router.navigate(['/admin/restaurants']);
    }
  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.restaurantService.get(this.id).take(1).subscribe(restaurant => this.restaurant = restaurant);
    } else {
      this.restaurant = new Restaurant();
    }
  }

}
