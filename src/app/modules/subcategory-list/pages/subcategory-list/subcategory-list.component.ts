import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AddEditeSubCategoryComponent } from '../../components/components/add-edite-sub-category/add-edite-sub-category.component';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/_services/app.service';
import { subCategoryMasterModel } from 'src/app/_models/subCategoryMasterModel';
import { ViewSubCategoryComponent } from '../../components/components/view-sub-category/view-sub-category.component';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
import * as moment from 'moment';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { Subscription, delay, take } from 'rxjs';
@Component({
  selector: 'app-subcategory-list',
  templateUrl: './subcategory-list.component.html',
  styleUrls: ['./subcategory-list.component.css']
})
export class SubcategoryListComponent implements OnInit,OnDestroy {
  isProceess: boolean = true;
  term: any;
  data: subCategoryMasterModel[] = [];
  userData: any;
  masterName?: any;
  subscription?: Subscription;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  constructor(private cd: ChangeDetectorRef,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private titleService: Title,
    private appService: AppService,
    private apiService: ApiService) {
    this.titleService.setTitle("CDC -Category");
    const d: any = localStorage.getItem("userData");
    this.userData = JSON.parse(d);
  }
  ngOnInit(): void {
    this.fatchData();
  }

  fatchData() {
    this.isProceess = true;
    this.masterName = "/subcategory";
    this.subscription = this.apiService.getAll(this.masterName).pipe(take(1),delay(1000)).subscribe(data => {
      if(data){
        this.data = data;
        this.count = this.data.length;
        this.isProceess = false;
        this.cd.detectChanges();
      }
    },error => {
      this.isProceess = false;
    })
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.fatchData();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fatchData();
  }

  onAdd() {
    this.isProceess = true;
    const modalRef = this.modalService.open(AddEditeSubCategoryComponent, { size: "sm" });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    modalRef.result.then((data: subCategoryMasterModel) => {
      if (data) {
        var model: subCategoryMasterModel = {
          categoryId: data.categoryId,
          subCategoryName: data.subCategoryName.trim(),
          createdBy: this.userData.userId,
          status: data.status,
        }
        this.masterName = `/subcategory`;
        let addData: any = {
          url: this.masterName,
          model: model
        }
        this.isProceess = true;
        this.subscription = this.apiService.add(addData).pipe(take(1),delay(1000)).subscribe(res => {
          this.isProceess = false;
          this.fatchData();
          this.toastr.success(res.message);
        }, error => {
          this.isProceess = false;
          this.toastr.error(error.messages);
        });
      }
    }).catch(() => { });
  }
  onEdit(dataItem: subCategoryMasterModel) {
    this.isProceess = true;
    const modalRef = this.modalService.open(AddEditeSubCategoryComponent, { size: "sm" });
    if (modalRef) {
      this.isProceess = false;
    }
    else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as AddEditeSubCategoryComponent;
    componentInstance.subCategoryMaster = dataItem;
    modalRef.result.then((data: subCategoryMasterModel) => {
      if (data) {
        var model: subCategoryMasterModel = {
          subCategoryId: dataItem.subCategoryId,
          updatedBy: this.userData.userId,
          status: data.status,
          categoryId: data.categoryId,
          subCategoryName: data.subCategoryName.trim(),
        }
        this.isProceess = true;
        this.masterName = `/subcategory/${dataItem?.subCategoryId}`;
        let updateData: any = {
          url: this.masterName,
          model: model
        }
        this.subscription = this.apiService.update(updateData).pipe(take(1),delay(1000)).subscribe(res => {
          this.toastr.success(res.message);
          this.isProceess = false;
          this.fatchData();
        }, error => {
          this.toastr.error(error.messages);
          this.isProceess = false;
        });
      }
    }).catch(() => { });
  }
  onViewDetail(dataItem: subCategoryMasterModel) {
    this.isProceess = true;
    const modalRef = this.modalService.open(ViewSubCategoryComponent, { size: "lg", centered: true, backdrop: "static" });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as ViewSubCategoryComponent;
    componentInstance.subCategoryMaster = dataItem;
  }
  onDownload() {
    const exportData = this.data.map(x => {
      let updatedBy:any = ' '
      if(x.updatedBy?.firstName  != undefined ){
        updatedBy = x.updatedBy?.firstName + ' ' + x.updatedBy?.lastName
      }
      else{
        updatedBy = ''
      }
      return {
        "Id": x.subCategoryId || '',
        "Sub Category": x.subCategoryName || '',
        "Category": x.category?.categoryName || '',
        "created By": x.createdBy?.firstName + ' ' + x.createdBy?.lastName || '',
        "Created Date": moment(x.createdDate || '').format("llll"),
        "Updated By": updatedBy,
        "Updated Date": moment(x.updatedDate || '').format("llll"),
        "Status": x.status ? 'Active' : 'Deactivate'
      }
    });
    const headers = ["Id", "Sub Category", "Category", "created By", "Created Date",
      "Updated By", "Updated Date", "Status"];
    this.appService.exportAsExcelFile(exportData, "Sub Category-Master", headers);
  }
  onDelete(dataItem: subCategoryMasterModel) {
    this.isProceess = true;
    const modalRef = this.modalService.open(ConfirmationDialogModalComponent, { size: "sm", centered: true, backdrop: "static" });
    if (modalRef) {
      this.isProceess = false;
    }
    else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as ConfirmationDialogModalComponent;
    componentInstance.message = "Are you sure you want to delete ?";

    modalRef.result.then((canDelete: boolean) => {
      if (canDelete) {
        this.masterName = `/subcategory/${dataItem?.subCategoryId}`;
        this.isProceess = true;
        this.subscription = this.apiService.deleteID(this.masterName).pipe(take(1),delay(1000)).subscribe(data => {
          this.isProceess = false;
          this.toastr.success(data.message);
          this.fatchData();
        }, error => {
          this.isProceess = false;
          this.toastr.error(error.message);
        });
      }
    }).catch(() => { });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
