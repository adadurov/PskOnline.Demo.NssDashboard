import { Injectable, Injector } from '@angular/core';
import { ConfigurationService } from './configuration.service';
import { BranchOffice } from '../models/branch-office';
import { EndpointFactory } from './endpoint-factory.service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchOfficeEndpointService extends EndpointFactory {

  private readonly _url: string = '/api/BranchOffice';

  constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {
    super(http, configurations, injector);
   }

  get fullUrl() { return this.configurations.baseUrl + this._url; }

  public getBranchOffice(deptId: string): Observable<BranchOffice> {
    const endpointUrl = `${this.fullUrl}/${deptId}`;

    return this.http.get<BranchOffice>(endpointUrl, this.getRequestHeaders()).pipe(
      catchError(error => {
        return this.handleError(error, () => this.getBranchOffice(deptId));
      })
      );

  }
}
