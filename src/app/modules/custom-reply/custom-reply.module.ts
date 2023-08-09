import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomReplyRoutingModule } from './custom-reply-routing.module';
import { AddEditeCustomReplyComponent } from './components/add-edite-custom-reply/add-edite-custom-reply.component';
import { ViewCustomReplyComponent } from './components/view-custom-reply/view-custom-reply.component';
import { CustomReplyComponent } from './pages/custom-reply/custom-reply.component';


@NgModule({
  declarations: [
    CustomReplyComponent,
    AddEditeCustomReplyComponent,
    ViewCustomReplyComponent
  ],
  imports: [
    CommonModule,
    CustomReplyRoutingModule
  ]
})
export class CustomReplyModule { }
