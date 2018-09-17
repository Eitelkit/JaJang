import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  animations: [ // used for animation
    trigger('fade', [
      transition('void => *', [
        style({opacity: 0}),
        animate(2000)
      ]),
      transition('* => void', [
        animate(2000, style({opacity: 0}))
        ])
    ])
  ]
})
export class CarouselComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
