import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantsCardGroupComponent } from './restaurants-card-group.component';

describe('RestaurantsCardGroupComponent', () => {
  let component: RestaurantsCardGroupComponent;
  let fixture: ComponentFixture<RestaurantsCardGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantsCardGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantsCardGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
