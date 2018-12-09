import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSummaryHeaderComponent } from './employee-summary-header.component';

describe('EmployeeSummaryHeaderComponent', () => {
  let component: EmployeeSummaryHeaderComponent;
  let fixture: ComponentFixture<EmployeeSummaryHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeSummaryHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSummaryHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
