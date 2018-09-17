import {Component, Input, OnInit} from '@angular/core';
import {Restaurant} from '../models/restaurant';

@Component({
  selector: 'app-restaurants-card-group',
  templateUrl: './restaurants-card-group.component.html',
  styleUrls: ['./restaurants-card-group.component.css']
})
export class RestaurantsCardGroupComponent {
  @Input() restaurants: Restaurant[] = []; // input: restaurants information
}
