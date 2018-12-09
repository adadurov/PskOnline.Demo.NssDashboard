import { TestBed, inject } from '@angular/core/testing';

import { PsaReportEndpointService } from './psa-report-endpoint.service';

describe('PsaReportEndpointService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PsaReportEndpointService]
    });
  });

  it('should be created', inject([PsaReportEndpointService], (service: PsaReportEndpointService) => {
    expect(service).toBeTruthy();
  }));
});
