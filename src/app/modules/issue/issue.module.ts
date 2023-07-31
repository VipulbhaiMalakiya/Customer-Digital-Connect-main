import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueRoutingModule } from './issue-routing.module';
import { AddEditeIssueComponent } from './components/add-edite-issue/add-edite-issue.component';
import { ViewIssueComponent } from './components/view-issue/view-issue.component';
import { IssueComponent } from './pages/issue/issue.component';
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { IssueFilterPipe } from 'src/app/_helpers/issue-filter.pipe';


@NgModule({
    declarations: [
        IssueComponent,
        AddEditeIssueComponent,
        ViewIssueComponent,
        IssueFilterPipe
    ],
    imports: [
        CommonModule,
        IssueRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        FormsModule
    ]
})
export class IssueModule { }
