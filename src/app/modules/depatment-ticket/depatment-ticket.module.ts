import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepatmentTicketRoutingModule } from './depatment-ticket-routing.module';
import { SharedModule } from "../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditeTicketComponent } from './components/edite-ticket/edite-ticket.component';
import { DepatmentTicketComponent } from './pages/depatment-ticket/depatment-ticket.component';
import { deptTickeftilterPipe } from 'src/app/_helpers/dept-ticket-filter.pipe';
import { ViewTicketComponent } from './components/view-ticket/view-ticket.component';
@NgModule({
  declarations: [
    DepatmentTicketComponent,
    EditeTicketComponent,
    deptTickeftilterPipe,
    ViewTicketComponent
  ],
  imports: [
    CommonModule,
    DepatmentTicketRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class DepatmentTicketModule { }
