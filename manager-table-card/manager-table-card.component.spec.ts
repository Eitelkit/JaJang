import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerTableCardComponent } from './manager-table-card.component';

describe('ManagerTableCardComponent', () => {
  let component: ManagerTableCardComponent;
  let fixture: ComponentFixture<ManagerTableCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerTableCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerTableCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
