import { Injectable, Injector } from '@angular/core';
import { EndpointFactory } from './endpoint-factory.service';
import { TenantSharedInfo } from '../models/tenant-shared-info.model';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class TenantEndpointService extends EndpointFactory {

  private readonly _url: string = '/api/Tenant';

  constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {
    super(http, configurations, injector);
   }

  get fullUrl() { return this.configurations.baseUrl + this._url; }

  getTenantSharedInfo(tenantId: string): Observable<TenantSharedInfo> {
    const endpointUrl = `${this.fullUrl}/${tenantId}/shared-info`;

    return this.http.get<TenantSharedInfo>(endpointUrl, this.getRequestHeaders())
      .pipe(catchError(error => {
        return this.handleError(error, () => this.getTenantSharedInfo(tenantId));
      })
      );
  }
}
