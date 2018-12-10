import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TenantService } from 'src/app/services/tenant.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Output()
  public organizationName = '';

  @Output()
  public departments: string[];

  @Output()
  public branchId: string;

  constructor(
    private authService: AuthService,
    private tenantService: TenantService
  ) {
    // set the departmentId of the current PsaReportComponent
    // to the departmentId of the current identity

    const user = this.authService.currentUser;
    const departmentId = user.departmentId;

    this.departments = [ departmentId ];
    this.branchId = user.branchOfficeId;
    this.tenantService.getTenantSharedInfo(user.tenantId).subscribe(
      result => this.organizationName = result.name
    );
  }

  ngOnInit() {
  }
}
