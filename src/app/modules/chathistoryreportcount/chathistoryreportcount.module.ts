import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChathistoryreportcountRoutingModule } from './chathistoryreportcount-routing.module';
import { ChathistoryreportcountComponent } from './chathistoryreportcount.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';
import { chathistoryreportcount } from 'src/app/_helpers/chathistoryreportcount';


@NgModule({
  declarations: [
    ChathistoryreportcountComponent,
    chathistoryreportcount
  ],
  imports: [
    CommonModule,
    ChathistoryreportcountRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class ChathistoryreportcountModule { }
