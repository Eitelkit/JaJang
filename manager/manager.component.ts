import {Component, OnDestroy, OnInit} from '@angular/core';
import {HereOrderService} from '../here-order.service';
import {ActivatedRoute} from '@angular/router';
import {Table} from '../models/table';
import {RestaurantService} from '../restaurant.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit, OnDestroy {
  tableSize = 300; // table size, initialize to 300
  tables$; // store the tables information (observable)
  restaurantId; // store the restaurant id
  private subscription: Subscription; // used for unsubscribe
  constructor(private hereOrderService: HereOrderService, // mobile service
              private restaurantService: RestaurantService, // restaurant service
              private route: ActivatedRoute) { // used for getting information from the url
  }
  completeService(tableId) {
    this.hereOrderService.completeService(tableId, this.restaurantId);
    // complete the service
  }
  status(table: Table): string { // change teh table card color
    if (table.needCheckOut) {
      return '../../assets/table-checkout.gif'; // blink red
    } else if (table.needService) {
      return '../../assets/table-warning.png'; // red
    } else if (table.waitFood) {
      return '../../assets/table-waiting.png'; // yellow
    } else if (table.occupied) {
      return '../../assets/table-idle.png'; // green
    } else {
      return '../../assets/table.png'; // no color
    }
  }
  ngOnInit() {
    this.restaurantId = this.route.parent.snapshot.url[1].toString(); // get the restaurant id
    this.tables$ = this.hereOrderService.getAllTable(this.restaurantId); // get the table
    this.subscription = this.restaurantService.get(this.restaurantId).subscribe(res => {
      this.tableSize = res.size; // get the size of table
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe(); // unsubscribe
  }

}
