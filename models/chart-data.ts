import {Order} from './order';

export class ChartData {
  name: string;
  value: number;
  constructor(order: Order) {
    this.name = order.date.toDateString();
    this.value = order.totalPrice;
  }
}



