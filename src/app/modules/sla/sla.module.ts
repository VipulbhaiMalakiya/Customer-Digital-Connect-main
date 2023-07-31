import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SLARoutingModule } from './sla-routing.module';
import { SlaReportComponent } from './pages/sla-report/sla-report.component';
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SLAReportPipe } from 'src/app/_helpers/sla-report';


@NgModule({
    declarations: [
        SlaReportComponent,
        SLAReportPipe
    ],
    imports: [
        CommonModule,
        SLARoutingModule,
        SharedModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        FormsModule
    ]
})
export class SLAModule { }
