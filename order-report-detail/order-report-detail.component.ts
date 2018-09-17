import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Order} from '../models/order';
import {CheckOutService} from '../check-out.service';
import {HereOrderService} from '../here-order.service';

@Component({
  selector: 'app-order-report-detail',
  templateUrl: './order-report-detail.component.html',
  styleUrls: ['./order-report-detail.component.css']
})
export class OrderReportDetailComponent implements OnInit {
  orderId: string; // store the order id
  restId: string; // store the restaurant id
  order: Order = new Order(); // create a new order
  constructor(private hereService: HereOrderService,
              private route: ActivatedRoute) {
  }
  async ngOnInit() {
    this.orderId = this.route.snapshot.url[1].toString(); // get the order id
    this.restId = this.route.parent.snapshot.url[1].toString(); // get the restaurant id
    this.hereService.getFinishedOrders(this.orderId, this.restId)
      .take(1).subscribe( order => {
      this.order = order; // get the order
    });
  }
}
