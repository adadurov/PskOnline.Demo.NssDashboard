import { TestBed, inject } from '@angular/core/testing';

import { DepartmentEndpointService } from './department-endpoint.service';

describe('DepartmentEndpointService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DepartmentEndpointService]
    });
  });

  it('should be created', inject([DepartmentEndpointService], (service: DepartmentEndpointService) => {
    expect(service).toBeTruthy();
  }));
});
