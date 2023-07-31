import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SlaReportComponent } from './pages/sla-report/sla-report.component';


const routes: Routes = [{ path: '', component: SlaReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SLARoutingModule { }
