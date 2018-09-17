import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgMakerComponent } from './svg-maker.component';

describe('SvgMakerComponent', () => {
  let component: SvgMakerComponent;
  let fixture: ComponentFixture<SvgMakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgMakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
