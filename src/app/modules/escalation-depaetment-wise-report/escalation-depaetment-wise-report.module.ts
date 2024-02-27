import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EscalationDepaetmentWiseReportRoutingModule } from './escalation-depaetment-wise-report-routing.module';
import { EscalationDepaetmentWiseReportComponent } from './escalation-depaetment-wise-report.component';


@NgModule({
  declarations: [
    EscalationDepaetmentWiseReportComponent
  ],
  imports: [
    CommonModule,
    EscalationDepaetmentWiseReportRoutingModule
  ]
})
export class EscalationDepaetmentWiseReportModule { }
