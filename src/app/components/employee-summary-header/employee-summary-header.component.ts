import { Component, OnInit, Input } from '@angular/core';
import { EmployeeSummaryGroup } from '../../psa-models/employee-summary-group';

@Component({
  selector: 'app-employee-summary-header',
  templateUrl: './employee-summary-header.component.html',
  styleUrls: ['./employee-summary-header.component.css']
})
export class EmployeeSummaryHeaderComponent implements OnInit {

  @Input()
  public value: EmployeeSummaryGroup;

  constructor() { }

  ngOnInit() {
  }

}
