import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HereOrderService} from '../here-order.service';

@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.css']
})
export class TableDetailComponent implements OnInit {
  tableId: string; // store the table id
  restaurantId: string; // store the restaurant id
  table$; // store the table information (observable)
  orders$; // store the order information (observable)
  constructor(private hereOrderService: HereOrderService, // mobile service
              private route: ActivatedRoute, // used for getting information from url
              private router: Router) { // used for navigation
  }
  cook(orderId) { // change the status of order to cooking
    this.hereOrderService.changeOrderStatusToCooking(orderId, this.tableId, this.restaurantId);
    this.orders$
      .subscribe(orders => {
        for (const order of orders) {
          if (order.status === 'place order') {
            return;
          }
        }
        this.hereOrderService.finishCook(this.tableId, this.restaurantId);
      });
  }
  finishCook(orderId) { // change the status of order to cooked
    this.hereOrderService.changeOrderStatusToCooked(orderId, this.tableId, this.restaurantId);
  }
  checkOut() {
    if (confirm('Are you sure you want to finish the table server?')) { // need users confirmation
      this.hereOrderService.finishOrders(this.tableId, this.restaurantId);
      this.router.navigate(['/restaurant-dashboard/', this.restaurantId], { queryParams: {section: 'Manager'}});
      // navigate to restaurant dashboard
    }
  }
  async ngOnInit() {
    this.tableId = this.route.snapshot.paramMap.get('tableId'); // get the table id
    this.restaurantId = this.route.parent.snapshot.url[1].toString(); // get the restaurant id
    this.table$ = this.hereOrderService.getTable(this.tableId, this.restaurantId); // get the table (observable)
    this.orders$ = this.hereOrderService.getAllOrdersForTable(this.tableId, this.restaurantId); // get the order (observable)
  }
}
