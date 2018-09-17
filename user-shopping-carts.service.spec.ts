import { TestBed, inject } from '@angular/core/testing';

import { UserShoppingCartsService } from './user-shopping-carts.service';

describe('UserShoppingCartsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserShoppingCartsService]
    });
  });

  it('should be created', inject([UserShoppingCartsService], (service: UserShoppingCartsService) => {
    expect(service).toBeTruthy();
  }));
});
