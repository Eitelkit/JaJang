import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Menu} from '../models/menu';
import {Subscription} from 'rxjs/Subscription';
import {PaperMenuService} from '../paper-menu.service';
import {Observable} from 'rxjs/Observable';
import {MenuItem} from '../models/menu-item';

@Component({
  selector: 'app-svg-maker-thumbnail',
  templateUrl: './svg-maker-thumbnail.component.html',
  styleUrls: ['./svg-maker-thumbnail.component.css']
})
export class SvgMakerThumbnailComponent implements OnInit, OnDestroy {
  @Input() menuId;
  @Input() size;
  restId: string;
  menu$: Observable<Menu>;
  menuItems: MenuItem[] = [];
  private subscription: Subscription;

  unitLength = 1;
  locations: number[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private paperMenuService: PaperMenuService) {
  }
  ngOnInit() {
    this.restId = this.route.parent.snapshot.url[1].toString();
    if (!this.menuId) {
      this.menuId = this.route.snapshot.paramMap.get('menuId');
    }
    this.menu$ = this.paperMenuService.getMenu(this.menuId, this.restId);
    this.subscription = this.menu$.subscribe(m => {
      this.menuItems = m.menuItems;
      this.locations = Array(this.menuItems.length).fill(1).map((x, i) => i * this.unitLength);
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  createMenu() {
    this.paperMenuService.createMenu(this.restId)
      .then(u => {
        this.router.navigate(['../menu-maker', u.key], {relativeTo: this.route, queryParams: {section: 'Make Menu'}});
      });
  }
  delete(itemId) {
    this.paperMenuService.delete(itemId, this.menuId, this.restId);
  }

}
