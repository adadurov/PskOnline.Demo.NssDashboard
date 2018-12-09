import { TestBed, inject } from '@angular/core/testing';

import { PsaReportService } from './psa-report.service';

describe('PsaReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PsaReportService]
    });
  });

  it('should be created', inject([PsaReportService], (service: PsaReportService) => {
    expect(service).toBeTruthy();
  }));
});
