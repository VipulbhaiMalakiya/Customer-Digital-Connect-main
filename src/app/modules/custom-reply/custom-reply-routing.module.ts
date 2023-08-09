import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomReplyComponent } from './pages/custom-reply/custom-reply.component';

const routes: Routes = [{ path: '', component: CustomReplyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomReplyRoutingModule { }
