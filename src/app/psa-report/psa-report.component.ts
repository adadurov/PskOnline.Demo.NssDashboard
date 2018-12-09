import { Component, OnInit } from '@angular/core';
import { PsaReport } from '../psa-models/psa-report';
import { PsaReportService } from '../services/psa-report.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-psa-report',
  templateUrl: './psa-report.component.html',
  styleUrls: ['./psa-report.component.css']
})
export class PsaReportComponent implements OnInit {

  constructor(
    private psaService: PsaReportService,
    private authService: AuthService
    ) {
  }

  psaReport: PsaReport;

  ngOnInit() {
    const user = this.authService.currentUser;
    const departmentId = user.departmentId;
    this.psaService.getReportForCurrentShift(departmentId)
      .toPromise()
      .then( report => this.psaReport = report );
  }

}
