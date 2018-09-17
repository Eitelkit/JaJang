import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderReportDetailComponent } from './order-report-detail.component';

describe('OrderReportDetailComponent', () => {
  let component: OrderReportDetailComponent;
  let fixture: ComponentFixture<OrderReportDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderReportDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
