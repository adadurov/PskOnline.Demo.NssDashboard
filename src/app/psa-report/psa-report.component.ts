import { Component, OnInit, Input } from '@angular/core';
import { PsaReport } from '../psa-models/psa-report';
import { PsaReportService } from '../services/psa-report.service';
import { PsaStatus } from '../psa-models/psa-status';
import { LSR_HrvFunctionalState } from '../psa-models/lsr-hrv-functional-state';
import { SvmrPreShiftConclusion } from '../psa-models/svmr-pre-shift-conclusion';
import { PsaSummary } from '../psa-models/psa-summary';

@Component({
  selector: 'app-psa-report',
  templateUrl: './psa-report.component.html',
  styleUrls: ['./psa-report.component.css']
})
export class PsaReportComponent implements OnInit {

  @Input()
  public departmentId: string;

  constructor(
    private psaService: PsaReportService
    ) {
  }

  psaReport: PsaReport;

  ngOnInit() {
    this.psaReport = this.getDesignTimeReportForCurrentShift();
    // this.psaService.getReportForCurrentShift(this.departmentId)
    //   .toPromise()
    //   .then( report => this.psaReport = report );
  }

  private getDesignTimeReportForCurrentShift(): any {

    const branchOfficeId = '24098234092';
    const departmentId = '03498263223';

    const completionTime = new Date();
    const workingShiftDate = new Date();

    const anEmployee = {
      externalId: '123',
      fullName: 'Перельман Игорь Витальевич',
      id: '2298345',
      PositionName: 'Электромонтер главного щита управления',
    };

    const aFinalConclusion = {
      color: '00bbbb',
      comment: '',
      status: 1, // PsaStatus.Conditional_Pass
      text: 'Частично соответствует'
    };

    const anSvmrConclusion = {
      testId: 'aowei20234',
      color: '00bbbb',
      comment: '',
      status: 1, // PsaStatus.Conditional_Pass
      text: 'Условно пройдено',
      meanResponseTimeMSec: 239,
      ipN1: 63.9
    };

    const anHrvConclusion = {
      testId: 'aowei20234',
      color: '00bbbb',
      comment: '',
      status: 1, // PsaStatus.Conditional_Pass
      text: 'Условно пройдено',
      in: 123.4,
      vsr: 0.35,
      lsr: 3, // LSR_HrvFunctionalState.Acceptable_3
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
