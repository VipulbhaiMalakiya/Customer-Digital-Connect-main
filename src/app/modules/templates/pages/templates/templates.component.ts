import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CustomersService } from 'src/app/_api';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { AppService } from 'src/app/_services/app.service';
import { AddEditeTablesComponent } from 'src/app/modules/tables/components/add-edite-tables/add-edite-tables.component';
import { Title } from '@angular/platform-browser';
import { AddEditeTemplateComponent } from '../../components/add-edite-template/add-edite-template.component';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent {
  isProceess: boolean = false;
  userData: any;


  constructor(
    private cd: ChangeDetectorRef,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private titleService: Title,
    public CSAPI: CustomersService,
    private appService: AppService,
    private router: Router,
    private apiService: ApiService
  ) {
    this.titleService.setTitle("CDC - Table List");
    const d: any = localStorage.getItem("userData");
    this.userData = JSON.parse(d);
  }

  onAdd() {
    this.isProceess = true;
    const modalRef = this.modalService.open(AddEditeTemplateComponent, { size: "xl" });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
  }
}
