import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProductsFormComponent } from './manage-products-form.component';

describe('ManageProductsFormComponent', () => {
  let component: ManageProductsFormComponent;
  let fixture: ComponentFixture<ManageProductsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageProductsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProductsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
