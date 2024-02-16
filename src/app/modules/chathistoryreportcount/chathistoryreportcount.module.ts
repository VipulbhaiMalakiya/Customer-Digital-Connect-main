import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChathistoryreportcountRoutingModule } from './chathistoryreportcount-routing.module';
import { ChathistoryreportcountComponent } from './chathistoryreportcount.component';


@NgModule({
  declarations: [
    ChathistoryreportcountComponent
  ],
  imports: [
    CommonModule,
    ChathistoryreportcountRoutingModule
  ]
})
export class ChathistoryreportcountModule { }
