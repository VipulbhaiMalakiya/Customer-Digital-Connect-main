import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatReportRoutingModule } from './chat-report-routing.module';
import { ChatReportComponent } from './chat-report.component';
import { SharedModule } from "../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Chat_Report } from 'src/app/_helpers/chat-report-filter';


@NgModule({
    declarations: [
        ChatReportComponent,
        Chat_Report
    ],
    imports: [
        CommonModule,
        ChatReportRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        NgxPaginationModule
    ]
})
export class ChatReportModule { }
