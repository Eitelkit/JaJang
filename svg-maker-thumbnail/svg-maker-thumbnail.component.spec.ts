import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgMakerThumbnailComponent } from './svg-maker-thumbnail.component';

describe('SvgMakerThumbnailComponent', () => {
  let component: SvgMakerThumbnailComponent;
  let fixture: ComponentFixture<SvgMakerThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgMakerThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgMakerThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
