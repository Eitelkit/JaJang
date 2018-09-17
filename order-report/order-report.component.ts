import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataTableResource} from 'angular5-data-table';
import {Subscription} from 'rxjs/Subscription';
import {Order} from '../models/order';
import {HereOrderService} from '../here-order.service';
import {StockChart} from 'angular-highcharts';

@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.css']
})
export class OrderReportComponent implements OnInit, OnDestroy {
  data = []; // data table
  orders: Order[] = []; // store the order
  tableResource: DataTableResource<Order>; // used for the data table
  items: Order[] = []; // used for the data table
  itemCount: number; // the number of items
  restuarantId: string; // store the restaurant id
  private subsription: Subscription; // used for unsubscribe
  constructor(private hereService: HereOrderService,
              private route: ActivatedRoute) {
    this.restuarantId = this.route.parent.snapshot.url[1].toString();
    this.subsription = this.hereService.getAllFinishedOrders(this.restuarantId)
      .subscribe( orders => {
        this.orders = orders;
        this.initializeTable(this.orders);
        this.chart();
      });
  }
  chart() {
    const orders = this.orders;
    for (const i in orders) {
      if (true) {
        const foundData = this.data.find(function (e) {
          return e.name === new Date(orders[i].date).toDateString();
        });
        if (foundData) {
          this.data[this.data.indexOf(foundData)].value += Math.round(orders[i].totalPrice);
        } else {
          this.data.push({'name': new Date(orders[i].date).toDateString(), 'value': Math.round(orders[i].totalPrice )});
        }
      }
    }
  }

  private initializeTable(orders: Order[]) {
    this.tableResource = new DataTableResource<Order>(orders);
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
  ngOnInit() {
  }
  ngOnDestroy() {
    this.subsription.unsubscribe();
  }
}
