import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatReportComponent } from './chat-report.component';

const routes: Routes = [{ path: '', component: ChatReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatReportRoutingModule { }
