import { TestBed } from '@angular/core/testing';

import { KiranaShopFormService } from './kirana-shop-form.service';

describe('KiranaShopFormService', () => {
  let service: KiranaShopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KiranaShopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
