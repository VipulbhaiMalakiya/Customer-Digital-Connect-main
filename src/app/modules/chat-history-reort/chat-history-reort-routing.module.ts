import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatHistoryReortComponent } from './chat-history-reort.component';

const routes: Routes = [{ path: '', component: ChatHistoryReortComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatHistoryReortRoutingModule { }
