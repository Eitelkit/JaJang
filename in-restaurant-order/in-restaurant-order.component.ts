import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HereOrderService} from '../here-order.service';
import {Order} from '../models/order';
import {Subscription} from 'rxjs/Subscription';
import {Table} from '../models/table';

@Component({
  selector: 'app-in-restaurant-order',
  templateUrl: './in-restaurant-order.component.html',
  styleUrls: ['./in-restaurant-order.component.css']
})
export class InRestaurantOrderComponent implements OnInit, OnDestroy {
  tableId: string; // store the table id
  restaurantId: string; // store the restaurant id
  orders$; // store order information (observable)
  orders: Order[]; // store the orders information
  table$; // store the table information (observable)
  table = new Table(); // store the table information
  private subscription1: Subscription; // used for unsubscribe
  private subscription2: Subscription; // avoid memory leak
  constructor(private route: ActivatedRoute,
              private hereService: HereOrderService,
              private router: Router) {
    this.tableId = this.route.snapshot.queryParamMap.get('tableKey'); // get the table id
    this.restaurantId = this.route.snapshot.queryParamMap.get('restaurantId'); // get the restaurant id
    this.table$ = this.hereService.getTable(this.tableId, this.restaurantId); // get the table (observable)
    this.orders$ = this.hereService.getAllOrdersForTable(this.tableId, this.restaurantId);
    this.subscription1 = this.orders$.subscribe( o => {
      this.orders = o; // get the order information
      if (this.orders === null || this.orders === undefined || this.orders.length === 0) {
        this.router.navigate(['/']); // redirect to the home page
      }
    });
    this.subscription2 = this.table$.subscribe( t => {
      this.table = t; // assign the value to table
    });
  }

  needService() { // change the table status to 'need service'
    this.hereService.needService(this.tableId, this.restaurantId);
  }
  checkOut() { // change the table status to 'check out'
    this.hereService.needCheckOut(this.tableId, this.restaurantId);
  }
  changeGifAccordingToStatus() { // change the gif according the table status
    if (this.table.needCheckOut) { // need check out
      return '../../assets/snorlax.gif';
    }
    if (this.table.needService) { // need service
      return '../../assets/bell.gif';
    }
    for (const order in this.orders) {
      if (this.orders[order].status !== 'cooked') {
        return '../../assets/cooking.gif'; // one of order is not cooked
      }
    }
    return '../../assets/all-cooked.gif'; // default
  }
  ngOnInit() {
  }
  ngOnDestroy() {
    this.subscription1.unsubscribe(); // unsubscribe
    this.subscription2.unsubscribe(); // avoid memory leak
  }

}
