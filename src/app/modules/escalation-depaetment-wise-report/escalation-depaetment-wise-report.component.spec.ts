import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscalationDepaetmentWiseReportComponent } from './escalation-depaetment-wise-report.component';

describe('EscalationDepaetmentWiseReportComponent', () => {
  let component: EscalationDepaetmentWiseReportComponent;
  let fixture: ComponentFixture<EscalationDepaetmentWiseReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscalationDepaetmentWiseReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscalationDepaetmentWiseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
