import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsaReportComponent } from './psa-report.component';

describe('PsaReportComponent', () => {
  let component: PsaReportComponent;
  let fixture: ComponentFixture<PsaReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsaReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsaReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
