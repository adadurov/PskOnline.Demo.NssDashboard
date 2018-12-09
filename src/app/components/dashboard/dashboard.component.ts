import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // bound to a template item
  public departments: string[];

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    // set the departmentId of the current PsaReportComponent
    // to the departmentId of the current identity

    const user = this.authService.currentUser;
    const departmentId = user.departmentId;

    this.departments = [ departmentId ];
  }
}
