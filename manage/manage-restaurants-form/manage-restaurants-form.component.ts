import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RestaurantService} from '../../restaurant.service';
import {Restaurant} from '../../models/restaurant';
import {AuthService} from '../../auth.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-manage-restaurants-form',
  templateUrl: './manage-restaurants-form.component.html',
  styleUrls: ['./manage-restaurants-form.component.css']
})
export class ManageRestaurantsFormComponent implements OnInit, OnDestroy {
  restaurant: Restaurant = new Restaurant(); // store the restaurant information
  restaurantId: string; // store the restaurant id
  uid: string; // store the user id
  private subscription: Subscription; // used for unsubscribe
  constructor(
    private router: Router, // used for navigation
    private route: ActivatedRoute, // get the information in url
    private auth: AuthService, // auth service
    private restaurantService: RestaurantService) {
  }
  save(restaurant) { // save the restaurant
    if (this.restaurantId) { // if the restaurant id exists
      this.restaurantService.update(this.restaurantId, restaurant); // update restaurant information
    } else {
      restaurant.ownerId = this.uid; // save the user id to restaurant owner id
      this.restaurantService.create(this.uid, restaurant); // create new restaurant
    }
    this.router.navigateByUrl('/manage-restaurants'); // navigate to the restaurant management
  }
  delete() { // delete the product
    if (confirm('Are you sure you want to delete this restaurant?')) { // need user to confirm
      this.restaurantService.delete(this.restaurantId); // delete the restaurant
      this.router.navigateByUrl('/manage-restaurants'); // navigate to the restaurant management
    }
  }
  ngOnInit() {
    this.subscription = this.auth.user$.subscribe( user => {
      this.uid = user.uid; // get the user id
    });
    this.restaurantId = this.route.snapshot.paramMap.get('restId'); // get the restaurant id
    if (this.restaurantId) { // if the restaurant id exists
      this.restaurantService.get(this.restaurantId).take(1).subscribe(restaurant => this.restaurant = restaurant);
      // get the restaurant
    } else {
      this.restaurant = new Restaurant(); // or create a new restaurant
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe(); // unsubscribe
  }
}
