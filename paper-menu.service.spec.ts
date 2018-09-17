import { TestBed, inject } from '@angular/core/testing';

import { PaperMenuService } from './paper-menu.service';

describe('PaperMenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaperMenuService]
    });
  });

  it('should be created', inject([PaperMenuService], (service: PaperMenuService) => {
    expect(service).toBeTruthy();
  }));
});
