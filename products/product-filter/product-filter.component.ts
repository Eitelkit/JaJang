import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from '../../category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$; // store the category (observable)
  @Input() category;
  constructor(private categoryService: CategoryService) {
    this.categories$ = categoryService.getAll(); // get the category (observable)
  }
  ngOnInit() {
  }

}
