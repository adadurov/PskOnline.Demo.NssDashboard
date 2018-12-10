import { Injectable } from '@angular/core';
import { TenantEndpointService } from './tenant-endpoint.service';
import { TenantSharedInfo } from '../models/tenant-shared-info.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  constructor(private endpoint: TenantEndpointService) { }

  public getTenantSharedInfo(tenantId: string): Observable<TenantSharedInfo> {
    return this.endpoint.getTenantSharedInfo(tenantId);
  }
}
