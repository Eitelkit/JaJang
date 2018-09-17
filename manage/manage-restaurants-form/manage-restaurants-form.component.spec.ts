import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRestaurantsFormComponent } from './manage-restaurants-form.component';

describe('ManageRestaurantsFormComponent', () => {
  let component: ManageRestaurantsFormComponent;
  let fixture: ComponentFixture<ManageRestaurantsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRestaurantsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRestaurantsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
