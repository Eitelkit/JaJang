import {Component, OnDestroy, OnInit} from '@angular/core';
import {Restaurant} from '../../models/restaurant';
import {ActivatedRoute, Router} from '@angular/router';
import {RestaurantService} from '../../restaurant.service';
import {PaperMenuService} from '../../paper-menu.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-restaurant-dashboard',
  templateUrl: './restaurant-dashboard.component.html',
  styleUrls: ['./restaurant-dashboard.component.css']
})
export class RestaurantDashboardComponent implements OnInit, OnDestroy {
  restaurants: Restaurant[]; // store the restaurants information
  restaurantId: string; // store the restaurant id
  section; // section information
  menuId: string; // store the menu id
  private subscription1: Subscription; // used for unsubscribe
  private subscription2: Subscription; // used for unsubscribe
  constructor(private route: ActivatedRoute, // used for getting information from url
              private router: Router, // used for navigation
              private restaurantService: RestaurantService, // restaurant service
              private paperMenuService: PaperMenuService) {
  }
  grow() { // grow the table card size in the dashboard
    this.restaurantService.growSize(this.restaurantId);
  }
  shrink() { // shrink the table card size in the dashboard
    this.restaurantService.shrinkSize(this.restaurantId);
  }
  deleteMenu() { // delete the paper menu
    if (confirm('Are you sure to delete this menu?')) { // need user to confirmation
      this.paperMenuService.deleteMenu(this.menuId, this.restaurantId); // delete the paper menu
      this.router.navigate(['./menu-maker'], {relativeTo: this.route, queryParams: {section: 'Make Menu'}});
      // navigate to the menu maker
    }
  }
  createMenu() { // create a new paper menu
    if (confirm('Are you sure to make a new menu?')) { // need user to confirmation
      this.paperMenuService.createMenu(this.restaurantId) // create a new paper menu
        .then(u => {
          this.router.navigate(['./menu-maker', u.key], {relativeTo: this.route, queryParams: {section: 'Make Menu'}});
          // navigate to the menu maker page
        });
    }
  }
  restaurantsBtn() {
    this.router.navigate(['/manage-restaurants']);
    // navigate to the manage restaurants page
  }
  ngOnDestroy() {
    this.subscription1.unsubscribe(); // unsubscribe
    this.subscription2.unsubscribe(); // unsubscribe
  }
  ngOnInit() {
    this.restaurantId = this.route.snapshot.url[1].toString(); // get the restaurant id
    this.subscription1 = this.route.queryParamMap.subscribe(p => {
      this.menuId = p.get('mI'); // get the menu id
    });
    this.subscription2 = this.route.queryParamMap.subscribe(pm => {
      this.section = pm.get('section'); // get the section information
    });
  }
}
