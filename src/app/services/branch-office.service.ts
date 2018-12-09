import { Injectable } from '@angular/core';
import { BranchOfficeEndpointService } from './branch-office-endpoint.service';
import { Observable } from 'rxjs';
import { BranchOffice } from '../models/branch-office';

@Injectable({
  providedIn: 'root'
})
export class BranchOfficeService {

  constructor(private endpoint: BranchOfficeEndpointService) { }

  public getBranchOffice(branchId: string): Observable<BranchOffice> {
    return this.endpoint.getBranchOffice(branchId);
  }
}
