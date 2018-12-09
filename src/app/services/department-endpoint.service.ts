import { Injectable, Injector } from '@angular/core';
import { Department } from '../models/department';
import { Observable } from 'rxjs';
import { EndpointFactory } from './endpoint-factory.service';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentEndpointService extends EndpointFactory {

  private readonly _url: string = '/api/Department';

  constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {
    super(http, configurations, injector);
   }

  get fullUrl() { return this.configurations.baseUrl + this._url; }

  public getDepartment(deptId: string): Observable<Department> {
    const endpointUrl = `${this.fullUrl}/${deptId}`;

    return this.http.get<Department>(endpointUrl, this.getRequestHeaders()).pipe(
      catchError(error => {
        return this.handleError(error, () => this.getDepartment(deptId));
      })
      );

  }
}
