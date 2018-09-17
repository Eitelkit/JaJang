import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantProductFilterComponent } from './restaurant-product-filter.component';

describe('RestaurantProductFilterComponent', () => {
  let component: RestaurantProductFilterComponent;
  let fixture: ComponentFixture<RestaurantProductFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantProductFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantProductFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
