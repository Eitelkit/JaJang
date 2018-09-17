import { TestBed, inject } from '@angular/core/testing';

import { HereOrderService } from './here-order.service';

describe('HereOrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HereOrderService]
    });
  });

  it('should be created', inject([HereOrderService], (service: HereOrderService) => {
    expect(service).toBeTruthy();
  }));
});
