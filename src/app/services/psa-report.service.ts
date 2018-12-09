import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PsaReport } from '../psa-models/psa-report';
import { PsaReportEndpointService } from './psa-report-endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class PsaReportService {

  constructor(
    private endpoint: PsaReportEndpointService
    ) {
  }

  getReportForCurrentShift(departmentId: string): Observable<PsaReport> {
    return this.endpoint.getReportForCurrentShift(departmentId);
  }
}
