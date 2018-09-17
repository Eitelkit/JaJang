import { TestBed, inject } from '@angular/core/testing';

import { RestaurantProductService } from './restaurant-product.service';

describe('RestaurantProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestaurantProductService]
    });
  });

  it('should be created', inject([RestaurantProductService], (service: RestaurantProductService) => {
    expect(service).toBeTruthy();
  }));
});
