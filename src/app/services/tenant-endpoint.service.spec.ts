import { TestBed, inject } from '@angular/core/testing';

import { TenantEndpointService } from './tenant-endpoint.service';

describe('TenantEndpointService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TenantEndpointService]
    });
  });

  it('should be created', inject([TenantEndpointService], (service: TenantEndpointService) => {
    expect(service).toBeTruthy();
  }));
});
