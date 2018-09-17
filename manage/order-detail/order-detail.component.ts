import {Component, OnInit} from '@angular/core';
import {CheckOutService} from '../../check-out.service';
import {ActivatedRoute} from '@angular/router';
import {Order} from '../../models/order';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  orderId: string; // store the order id
  restId: string; // store the restaurant id
  order: Order = new Order(); // store the order information
  constructor(private checkOutService: CheckOutService,
              private route: ActivatedRoute) {
  }
  async ngOnInit() {
    this.orderId = this.route.snapshot.url.pop().toString(); // get the order id
    this.route.parent.url.take(1).subscribe( u => {
        this.restId = u[1].toString(); // get the restaurant id
        this.checkOutService.getOneOrder(this.restId, this.orderId)
          .take(1).subscribe( order => {
            this.order = order; // get the order
        });
      }
    );
  }
}
