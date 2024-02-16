import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChathistoryreportcountComponent } from './chathistoryreportcount.component';

const routes: Routes = [{ path: '', component: ChathistoryreportcountComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChathistoryreportcountRoutingModule { }
