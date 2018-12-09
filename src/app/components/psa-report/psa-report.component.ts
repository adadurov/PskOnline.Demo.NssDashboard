import { Component, OnInit, Input } from '@angular/core';
import { PsaReport } from '../../psa-models/psa-report';
import { PsaReportService } from '../../services/psa-report.service';
import { PsaStatus } from '../../psa-models/psa-status';
import { LSR_HrvFunctionalState } from '../../psa-models/lsr-hrv-functional-state';
import { SvmrPreShiftConclusion } from '../../psa-models/svmr-pre-shift-conclusion';
import { PsaSummary } from '../../psa-models/psa-summary';
import { HrvPreShiftConclusion } from 'src/app/psa-models/hrv-pre-shift-conclusion';
import { PsaFinalConclusion } from 'src/app/psa-models/psa-final-conclusion';
import { RusHydroEmployee } from 'src/app/psa-models/rushydro-employee';
import { EmployeeSummaryGroup } from 'src/app/psa-models/employee-summary-group';
import { Summary } from '@angular/compiler';

@Component({
  selector: 'app-psa-report',
  templateUrl: './psa-report.component.html',
  styleUrls: ['./psa-report.component.css']
})
export class PsaReportComponent implements OnInit {

  @Input()
  public departmentId: string;

  public summaryGroupsByEmployee: EmployeeSummaryGroup[] = null;

  public psaReport: PsaReport;

  constructor(
    private psaService: PsaReportService
    ) {
  }

  ngOnInit() {
    this.psaReport = this.getDesignTimeReportForCurrentShift();
    // this.psaService.getReportForCurrentShift(this.departmentId)
    //   .toPromise()
    //   .then( report => this.psaReport = report );

    this.summaryGroupsByEmployee = this.groupSummaries(this.psaReport);
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
    });
    return empSumGroups;
  }

  private getDesignTimeReportForCurrentShift(): any {

    const branchOfficeId = '24098234092';
    const departmentId = '03498263223';

    const completionTime = new Date();
    const workingShiftDate = new Date();

    const anEmployee: RusHydroEmployee = {
      externalId: '123',
      fullName: 'Перельман Игорь Витальевич',
      id: '2298345',
      positionName: 'Электромонтер главного щита управления',
    };

    const aFinalConclusion: PsaFinalConclusion = {
      color: '00bbbb',
      comment: '',
      status: PsaStatus.Conditional_Pass,
      text: 'Частично соответствует'
    };

    const anSvmrConclusion: SvmrPreShiftConclusion = {
      testId: 'aowei20234',
      color: '00bbbb',
      comment: '',
      status: PsaStatus.Conditional_Pass,
      text: 'Условно пройдено',
      meanResponseTimeMSec: 239,
      ipN1: 63.9
    };

    const anHrvConclusion: HrvPreShiftConclusion = {
      testId: 'aowei20234',
      color: '00bbbb',
      comment: '',
      status: PsaStatus.Conditional_Pass,
      text: 'Условно пройдено',
      in: 123.4,
      vsr: 0.35,
      lsr: LSR_HrvFunctionalState.Acceptable_3,
      lsR_Text: 'Приемлемое',
      stateMatrixCol: 2,
      stateMatrixRow: 2,
      meanHR: 89.1
    };

    const aSummary: PsaSummary = {
      id: 'sldf0202947398754',
      inspectionId: 'qwertuyuiop',
      branchOfficeId: branchOfficeId,
      departmentId: departmentId,
      hostName: 'sb12345',
      toolVersion: 'PskOnline.Client.Demo/0.1.7',
      employee: anEmployee,
      finalConclusion: aFinalConclusion,
      svmrConclusion: anSvmrConclusion,
      hrvConclusion: anHrvConclusion,
      workingShiftNumber: 1,
      completionTime: completionTime,
      workingShiftDate: workingShiftDate
    };

    return {
      branchOfficeId: branchOfficeId,
      departmentId: departmentId,
      branchOfficeName: 'ПСК-Онлайн',
      departmentName: 'Демо-ГЭС',
      shiftDate: workingShiftDate,
      shiftName: 'день',
      shiftNumber: 1,
      shiftStartTime: '07:00:00.000',
      summaries: [ aSummary ]
    };
  }
}
