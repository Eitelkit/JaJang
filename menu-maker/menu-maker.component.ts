import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PaperMenuService} from '../paper-menu.service';
import {Menu} from '../models/menu';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-menu-maker',
  templateUrl: './menu-maker.component.html',
  styleUrls: ['./menu-maker.component.css']
})
export class MenuMakerComponent implements OnInit, OnDestroy {
  menuId: string; // store the menu id
  restId; string; // store the restaurant id
  menus: Menu[]; // store the paper menu id
  private subscription: Subscription; // used for unsubscribe
  constructor(private route: ActivatedRoute, // used for getting information from url
              private paperMenuService: PaperMenuService) {
    this.restId = this.route.parent.snapshot.url[1].toString(); // get the restaurant id
    this.menuId = this.route.snapshot.paramMap.get('menuId'); // get the menu id
    this.subscription = this.paperMenuService.getAllMenus(this.restId)
      .subscribe( m => {
        this.menus = m; // get the menu
      });
  }
  ngOnInit() {
  }
  ngOnDestroy() {
    this.subscription.unsubscribe(); // unsubscribe
  }

}
