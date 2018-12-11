import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TenantService } from 'src/app/services/tenant.service';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth-guard.service';

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
    private router: Router,
    private authService: AuthService,
    private tenantService: TenantService
  ) {
    // set the departmentId of the current PsaReportComponent
    // to the departmentId of the current identity
    if (this.hasCredentials(router)) {
      // authenticate user again / remove credentials from URL, return to the dashboard
      AuthGuard.handleLoginHelper(router.url, this.authService, router);
      return;
    }


    const user = this.authService.currentUser;
    const departmentId = user.departmentId;

    this.departments = [ departmentId ];
    this.branchId = user.branchOfficeId;
    this.tenantService.getTenantSharedInfo(user.tenantId).subscribe(
      result => this.organizationName = result.name
    );
  }

  hasCredentials(router: Router): boolean {
    const tree = this.router.parseUrl(router.url);
    return tree.queryParamMap.has('client_id') || tree.queryParamMap.has('client_secret');
  }

  ngOnInit() {
  }
}
