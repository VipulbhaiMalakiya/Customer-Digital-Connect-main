import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EscalationDepaetmentWiseReportRoutingModule } from './escalation-depaetment-wise-report-routing.module';
import { EscalationDepaetmentWiseReportComponent } from './escalation-depaetment-wise-report.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';
import { eeFilterPipe } from 'src/app/_helpers/EscalationDepaetment-filter';


@NgModule({
  declarations: [
    EscalationDepaetmentWiseReportComponent,
    eeFilterPipe
  ],
  imports: [
    CommonModule,
    EscalationDepaetmentWiseReportRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,

  ]
})
export class EscalationDepaetmentWiseReportModule { }
