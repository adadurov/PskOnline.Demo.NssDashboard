import { TestBed, inject } from '@angular/core/testing';

import { BranchOfficeEndpointService } from './branch-office-endpoint.service';

describe('BranchOfficeEndpointService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BranchOfficeEndpointService]
    });
  });

  it('should be created', inject([BranchOfficeEndpointService], (service: BranchOfficeEndpointService) => {
    expect(service).toBeTruthy();
  }));
});
