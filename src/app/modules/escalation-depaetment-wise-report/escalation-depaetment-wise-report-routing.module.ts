import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EscalationDepaetmentWiseReportComponent } from './escalation-depaetment-wise-report.component';

const routes: Routes = [{ path: '', component: EscalationDepaetmentWiseReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EscalationDepaetmentWiseReportRoutingModule { }
