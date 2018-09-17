import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InRestaurantOrderComponent } from './in-restaurant-order.component';

describe('InRestaurantOrderComponent', () => {
  let component: InRestaurantOrderComponent;
  let fixture: ComponentFixture<InRestaurantOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InRestaurantOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InRestaurantOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
