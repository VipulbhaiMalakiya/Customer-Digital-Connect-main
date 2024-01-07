import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketRoutingModule } from './ticket-routing.module';
import { AddEditeTicketComponent } from './components/add-edite-ticket/add-edite-ticket.component';
import { ViewTicketComponent } from './components/view-ticket/view-ticket.component';
import { TicketComponent } from './pages/ticket/ticket.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { TicketilterPipe } from 'src/app/_helpers/ticket-filter.pipe';
import { UpdateTicketComponent } from './update-ticket/update-ticket.component';
import { FilterTicketComponent } from './components/filter-ticket/filter-ticket.component';
import { AuditorAddComponent } from './components/auditor-add/auditor-add.component';
import { AuditorUpdateComponent } from './components/auditor-update/auditor-update.component';
@NgModule({
  declarations: [
    TicketComponent,
    AddEditeTicketComponent,
    ViewTicketComponent,
    TicketilterPipe,
    UpdateTicketComponent,
    FilterTicketComponent,
    AuditorAddComponent,
    AuditorUpdateComponent
  ],
  imports: [
    CommonModule,
    TicketRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class TicketModule { }
