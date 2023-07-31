import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplatesRoutingModule } from './templates-routing.module';
import { TemplatesComponent } from './pages/templates/templates.component';
import { SharedModule } from "../shared/shared.module";
import { AddEditeTemplateComponent } from './components/add-edite-template/add-edite-template.component';
@NgModule({
    declarations: [
        TemplatesComponent,
        AddEditeTemplateComponent
    ],
    imports: [
        CommonModule,
        TemplatesRoutingModule,
        SharedModule
    ]
})
export class TemplatesModule { }
