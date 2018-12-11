import { Component, OnInit, Input } from '@angular/core';
import { of, Observable } from 'rxjs';
import { PsaReport } from '../../psa-models/psa-report';
import { PsaReportService } from '../../services/psa-report.service';
import { PsaStatus } from '../../psa-models/psa-status';
import { PsaSummary } from '../../psa-models/psa-summary';
import { EmployeeSummaryGroup } from 'src/app/psa-models/employee-summary-group';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { StaticData } from './static-data';

@Component({
  selector: 'app-psa-report',
  templateUrl: './psa-report.component.html',
  styleUrls: ['./psa-report.component.css']
})
export class PsaReportComponent implements OnInit {

  @Input()
  public departmentId: string = null;

  @Input()
  public branchId: string = null;

  public branchName = '';

  public deptName = '';

  public summaryGroupsByEmployee: EmployeeSummaryGroup[] = null;

  public psaReport: PsaReport;

  private _useStaticData = false;

  private _error: any;

  constructor(
    private psaService: PsaReportService,
    private router: Router
    ) {
    // If there is a 'use_static_data' argument in the query component of the path,
    // use a static data to display the report
    // this is useful for development
    const tree = this.router.parseUrl(router.url);
    this._useStaticData = tree.queryParamMap.has('use_static_data');
  }

  ngOnInit() {
    if (this.departmentId === null ||
        this.branchId === null ) {
      console.warn('Department ID or Branch ID was not specified');
      return;
    }

    this.getReportForCurrentShift(this.departmentId)
      .subscribe(
        result => {
          this.psaReport = result;
          this.summaryGroupsByEmployee = this.groupSummaries(this.psaReport);
        },
        error => {
          console.error(error);
          this._error = error;
        }
      );
  }

  hasDataToDisplay(): boolean {
    if (isNullOrUndefined(this.summaryGroupsByEmployee)) {
      return false;
    }
    return this.summaryGroupsByEmployee.length > 0;
  }

  hasError(): boolean {
    return ! isNullOrUndefined(this._error);
  }

  groupByEmployeeId(xs: PsaSummary[]): {key: any, values: PsaSummary[]}[] {
    return xs.reduce( (rv, x) => {
      const v = x.employee.id;
      const el = rv.find((r) => r && r.key === v);
      if (el) { el.values.push(x); } else { rv.push({ key: v, values: [x] }); }
      return rv;
    },
    []);
  }

  chooseBestItem(summaries: PsaSummary[]): PsaSummary {
    // less is better, so we need to choose the  item with the smallest
    const ordered = summaries.sort( (s1, s2) => {
        return s1.finalConclusion.status === s2.finalConclusion.status ? 0 :
        s1.finalConclusion.status > s2.finalConclusion.status ? 1 : -1;
      }
    );
    if (ordered.length > 0) {
      return ordered[0];
    }
    return null;
  }

  private groupSummaries(report: PsaReport): EmployeeSummaryGroup[] {
    const sumGroups = this.groupByEmployeeId(report.summaries);

    // convert each group of PsaSummary to EmployeeSummaryGroup
    const empSumGroups = sumGroups.map(element => {
      const empSumGroup = new EmployeeSummaryGroup();
      empSumGroup.bestItem = this.chooseBestItem(element.values);
      empSumGroup.otherItems = element.values.splice(element.values.indexOf(empSumGroup.bestItem), 1);
      empSumGroup.employee = empSumGroup.bestItem.employee;
      return empSumGroup;
    })
    // sort by full name
    .sort( (sg1, sg2) => {
       return sg1.employee.fullName.localeCompare(sg2.employee.fullName);
    });
    return empSumGroups;
  }

  private getReportForCurrentShift(deptId: string): Observable<PsaReport> {
    if (this._useStaticData) {
      return of(this.getDesignTimeReportForCurrentShift());
    } else {
      return this.psaService.getReportForCurrentShift(deptId);
    }
  }

  getClassNameForStatus(summary: PsaSummary): string {
    const status = summary.finalConclusion.status;
    if (status === PsaStatus.Fail) {
      return 'td-psa-fail';
    } else if (status === PsaStatus.Conditional_Pass) {
      return 'td-psa-cond-pass';
    } else if (status === PsaStatus.Pass) {
      return 'td-psa-pass';
    }
    return 'td-psa-unknown';
  }

  private getDesignTimeReportForCurrentShift(): PsaReport {
    return StaticData.REPORT;
  }
}
