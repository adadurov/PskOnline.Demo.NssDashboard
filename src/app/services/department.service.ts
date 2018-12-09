import { Injectable } from '@angular/core';
import { DepartmentEndpointService } from './department-endpoint.service';
import { Department } from '../models/department';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private endpoint: DepartmentEndpointService) { }

  public getDepartment(deptId: string): Observable<Department> {
    return this.endpoint.getDepartment(deptId);
  }
}
