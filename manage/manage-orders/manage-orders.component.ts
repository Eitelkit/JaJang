import { Component, OnInit } from '@angular/core';
import {Restaurant} from '../../models/restaurant';
import {DataTableResource} from 'angular5-data-table';
import {Subscription} from 'rxjs/Subscription';
import {RestaurantService} from '../../restaurant.service';
import {AuthService} from '../../auth.service';
import {Order} from '../../models/order';
import {CheckOutService} from '../../check-out.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {
  orders: Order[] = []; // store the orders information
  tableResource: DataTableResource<Order>; // used for data table
  items: Order[] = []; // used for data table
  itemCount: number; // used for data table
  restuarantId: string; // store the restaurant id
  private subsription: Subscription;
  constructor(private checkOutService: CheckOutService,
              private route: ActivatedRoute) {
    this.route.parent.url.take(1).subscribe(u => {
      this.restuarantId = u[1].toString(); // get the restaurant id
      this.checkOutService.getAllOrders(this.restuarantId)
        .subscribe( orders => {
          this.orders = orders; // get the order
          this.initializeTable(this.orders); // initial the data table
        });
    });
  }

  private initializeTable(orders: Order[]) {
    this.tableResource = new DataTableResource<Order>(orders);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items); // get the items
    this.tableResource.count()
      .then(count => this.itemCount = count); // get the number of items
  }
  reloadItems(params) { // reload the items
    if (this.tableResource) {
      this.tableResource.query(params)
        .then(items => this.items = items); // get the items
    }
  }
  ngOnInit() {
  }
}
