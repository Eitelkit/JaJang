import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserShoppingCartsComponent } from './user-shopping-carts.component';

describe('UserShoppingCartsComponent', () => {
  let component: UserShoppingCartsComponent;
  let fixture: ComponentFixture<UserShoppingCartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserShoppingCartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserShoppingCartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
