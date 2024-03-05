import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from "../shared/shared.module";
import { GoogleChartsModule } from 'angular-google-charts';
import { MyticketComponent } from './pages/myticket/myticket.component';
import { AssigntomeComponent } from './pages/assigntome/assigntome.component';
import { DashboardTicketFilter } from 'src/app/_helpers/dashboard ticket-filter';
import { FormsModule } from '@angular/forms';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@NgModule({
    declarations: [
        AdminDashboardComponent,
        UserDashboardComponent,
        MyticketComponent,
        AssigntomeComponent,
        DashboardTicketFilter
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        NgChartsModule,
        SharedModule,
        GoogleChartsModule,
        FormsModule,
        CanvasJSAngularChartsModule
    ]
})
export class DashboardModule { }
