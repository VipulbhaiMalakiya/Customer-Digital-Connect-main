import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesRoutingModule } from './tables-routing.module';
import { AddEditeTablesComponent } from './components/add-edite-tables/add-edite-tables.component';
import { TablesComponent } from './pages/tables/tables.component';
import { SharedModule } from "../shared/shared.module";
@NgModule({
    declarations: [
        TablesComponent,
        AddEditeTablesComponent
    ],
    imports: [
        CommonModule,
        TablesRoutingModule,
        SharedModule
    ]
})
export class TablesModule { }
