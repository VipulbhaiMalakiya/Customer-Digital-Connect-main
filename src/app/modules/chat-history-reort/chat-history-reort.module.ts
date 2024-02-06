import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatHistoryReortRoutingModule } from './chat-history-reort-routing.module';
import { ChatHistoryReortComponent } from './chat-history-reort.component';


@NgModule({
  declarations: [
    ChatHistoryReortComponent
  ],
  imports: [
    CommonModule,
    ChatHistoryReortRoutingModule
  ]
})
export class ChatHistoryReortModule { }
