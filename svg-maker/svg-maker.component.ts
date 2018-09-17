import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RestaurantProductService} from '../restaurant-product.service';
import {RestaurantService} from '../restaurant.service';
import {PaperMenuService} from '../paper-menu.service';
import {Menu} from '../models/menu';
import {Observable} from 'rxjs/Observable';
import {MenuItem} from '../models/menu-item';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-svg-maker',
  templateUrl: './svg-maker.component.html',
  styleUrls: ['./svg-maker.component.css']
})
export class SvgMakerComponent implements OnInit, OnDestroy {
  @Input() size; // input the svg paper menu size
  menuId: string; // store the menu id
  restId: string; // store the restaurant id
  menu$: Observable<Menu>; // store the menu(observable)
  menuItems: MenuItem[] = []; // store the menu items
  private subscription: Subscription; // used for unsubscribe

  unitLength = 1; // the length between two lines in paper menu
  locations: number[] = []; // the location of different items

  constructor(private route: ActivatedRoute, // used for getting information from url
              private router: Router, // used for navigation
              private paperMenuService: PaperMenuService) { // paper menu service
  }
  ngOnInit() {
    this.restId = this.route.parent.snapshot.url[1].toString(); // get the restaurant id
    this.route.paramMap.subscribe( p => {
      this.menuId = p.get('menuId'); // get the menu id
      this.menu$ = this.paperMenuService.getMenu(this.menuId, this.restId); // get the menu information(observable)
      this.subscription = this.menu$.subscribe(m => {
        this.menuItems = m.menuItems; // get the menu items
        this.locations = Array(this.menuItems.length).fill(1).map((x, i) => i * this.unitLength);
        // get the location
      });
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe(); // unsubscribe
  }
  createMenu() {
    this.paperMenuService.createMenu(this.restId)
      .then(u => {
        this.router.navigate(['../menu-maker', u.key], {relativeTo: this.route, queryParams: {section: 'Make Menu'}});
        // navigate to the menu maker
      });
  }
  delete(itemId) { // delete the item according to its id
    this.paperMenuService.delete(itemId, this.menuId, this.restId);
  }

}
