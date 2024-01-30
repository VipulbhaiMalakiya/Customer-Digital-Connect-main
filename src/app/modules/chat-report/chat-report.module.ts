import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatReportRoutingModule } from './chat-report-routing.module';
import { ChatReportComponent } from './chat-report.component';


@NgModule({
  declarations: [
    ChatReportComponent
  ],
  imports: [
    CommonModule,
    ChatReportRoutingModule
  ]
})
export class ChatReportModule { }
