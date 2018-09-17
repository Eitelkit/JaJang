import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HereOrderService} from '../here-order.service';
import {Subscription} from 'rxjs/Subscription';
import {Order} from '../models/order';
import {DataTableResource} from 'angular5-data-table';

@Component({
  selector: 'app-order-chart',
  templateUrl: './order-chart.component.html',
  styleUrls: ['./order-chart.component.css']
})
export class OrderChartComponent implements OnInit, OnDestroy {
  data = []; // store the chart data

  orders: Order[] = []; // store the order
  tableResource: DataTableResource<Order>; // used for the data table
  items: Order[] = []; // used for the data table
  itemCount: number; // the number of items
  restuarantId: string; // store the restaurant id
  private subsription: Subscription; // used for unsubscribe
  constructor(private hereService: HereOrderService, // mobile service
              private route: ActivatedRoute) { // used for getting information from the url
    this.restuarantId = this.route.parent.snapshot.url[1].toString(); // get the restaurant id
    this.subsription = this.hereService.getAllFinishedOrders(this.restuarantId)
      .subscribe( orders => {
        this.orders = orders; // get the order information
        this.initializeTable(this.orders); // initialize the data table
        this.chart();
      });
  }
  chart() {
    const orders = this.orders; // orders information
    for (const i in orders) {
      if (true) {
        const foundData = this.data.find(function (e) {
          return e.name === new Date(orders[i].date).toDateString();
          // find the cart data according to the date
        });
        if (foundData) { // if the date of data exists
          this.data[this.data.indexOf(foundData)].value += Math.round(orders[i].totalPrice);
          // plus total price
        } else {
          this.data.push({'name': new Date(orders[i].date).toDateString(), 'value': Math.round(orders[i].totalPrice )});
          // or create new
        }
      }
    }
  }
  private initializeTable(orders: Order[]) {
    this.tableResource = new DataTableResource<Order>(orders); // new a data table object
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
  ngOnDestroy() {
    this.subsription.unsubscribe(); // unsubscribe
  }}
