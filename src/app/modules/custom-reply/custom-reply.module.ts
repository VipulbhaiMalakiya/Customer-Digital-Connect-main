import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomReplyRoutingModule } from './custom-reply-routing.module';
import { AddEditeCustomReplyComponent } from './components/add-edite-custom-reply/add-edite-custom-reply.component';
import { ViewCustomReplyComponent } from './components/view-custom-reply/view-custom-reply.component';
import { CustomReplyComponent } from './pages/custom-reply/custom-reply.component';
import { customReplyFilterPipe } from 'src/app/_helpers/custom-reply-filter';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
    declarations: [
        CustomReplyComponent,
        AddEditeCustomReplyComponent,
        ViewCustomReplyComponent,
        customReplyFilterPipe,

    ],
    imports: [
        CommonModule,
        CustomReplyRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        FormsModule
    ]
})
export class CustomReplyModule { }
