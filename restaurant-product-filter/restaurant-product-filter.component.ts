import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from '../category.service';
import {AuthService} from '../auth.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-restaurant-product-filter',
  templateUrl: './restaurant-product-filter.component.html',
  styleUrls: ['./restaurant-product-filter.component.css']
})
export class RestaurantProductFilterComponent implements OnInit {
  categories$; // store the categories information (observable)
  restaurantId: string; // store the restaurant id
  @Input() category; // input category
  constructor(private categoryService: CategoryService, // category service
              private route: ActivatedRoute) { // used for getting information from url
    this.categories$ = categoryService.getAll(); // get the categories (observable)
    this.restaurantId = route.snapshot.paramMap.get('id'); // get the restaurant id
  }
  ngOnInit() {
  }
}
