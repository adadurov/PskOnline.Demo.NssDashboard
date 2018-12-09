import { Injectable, Injector } from '@angular/core';
import { EndpointFactory } from './endpoint-factory.service';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from './configuration.service';
import { PsaReport } from '../psa-models/psa-report';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PsaReportEndpointService extends EndpointFactory {

  private readonly _url: string = '/api/plugins/rushydro-psa/PsaReport/department';

  constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {
    super(http, configurations, injector);
   }

  get fullUrl() { return this.configurations.baseUrl + this._url; }

  getReportForCurrentShift(deptId: string): Observable<PsaReport> {
    const endpointUrl = `${this.fullUrl}/${deptId}/current`;

    return this.http.get<PsaReport>(endpointUrl, this.getRequestHeaders()).pipe(
      catchError(error => {
        return this.handleError(error, () => this.getReportForCurrentShift(deptId));
      })
      );
    }
}
