import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatHistoryReortRoutingModule } from './chat-history-reort-routing.module';
import { ChatHistoryReortComponent } from './chat-history-reort.component';
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Chat_History } from 'src/app/_helpers/chathistry';


@NgModule({
    declarations: [
        ChatHistoryReortComponent,
        Chat_History
    ],
    imports: [
        CommonModule,
        ChatHistoryReortRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        NgxPaginationModule
    ]
})
export class ChatHistoryReortModule { }
