import { Component, OnInit, Input } from '@angular/core';
import { PsaSummary } from 'src/app/psa-models/psa-summary';

@Component({
  selector: 'app-employee-summary',
  templateUrl: './employee-summary.component.html',
  styleUrls: ['./employee-summary.component.css']
})
export class EmployeeSummaryComponent implements OnInit {

  @Input()
  public summary: PsaSummary;

  constructor() { }

  ngOnInit() {
  }

}
