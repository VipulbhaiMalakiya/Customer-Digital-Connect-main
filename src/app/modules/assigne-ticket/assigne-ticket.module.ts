import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssigneTicketRoutingModule } from './assigne-ticket-routing.module';
import { TicketComponent } from './pages/ticket/ticket.component';
import { AddEditeTicketComponent } from './components/add-edite-ticket/add-edite-ticket.component';
import { ViewTicketComponent } from './components/view-ticket/view-ticket.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';
import { assignedTickeftilterPipe } from 'src/app/_helpers/assigned-ticket';
import { OnAproveComponent } from './components/on-aprove/on-aprove.component';
import { OnRejectComponent } from './components/on-reject/on-reject.component';
import { ZeotyAddUpdateComponent } from './components/zeoty-add-update/zeoty-add-update.component';


@NgModule({
  declarations: [
    TicketComponent,
    AddEditeTicketComponent,
    ViewTicketComponent,
    assignedTickeftilterPipe,
    OnAproveComponent,
    OnRejectComponent,
    ZeotyAddUpdateComponent
  ],
  imports: [
    CommonModule,
    AssigneTicketRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class AssigneTicketModule { }
