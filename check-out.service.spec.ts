import { TestBed, inject } from '@angular/core/testing';

import { CheckOutService } from './check-out.service';

describe('CheckOutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckOutService]
    });
  });

  it('should be created', inject([CheckOutService], (service: CheckOutService) => {
    expect(service).toBeTruthy();
  }));
});
