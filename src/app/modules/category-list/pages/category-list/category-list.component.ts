import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AddEditeCategoryComponent } from '../../components/add-edite-category/add-edite-category.component';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { AppService } from 'src/app/_services/app.service';
import { CategoryMasterModel } from 'src/app/_models/category';
import { ViewCategoryComponent } from '../../components/view-category/view-category.component';
import * as moment from 'moment';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { Subscription, delay, take, takeWhile } from 'rxjs';
import { CategoryRepository } from 'src/app/State/repository/category-repository';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],

})
export class CategoryListComponent implements OnInit, OnDestroy {
  isProceess: boolean = true;
  data: CategoryMasterModel[] = [];
  loading = false;
  error = false;
  isAlive = true;
  subscription?: Subscription;
  term: any;
  userData: any;
  masterName?: any;
  page: number = 1;
  count: number = 0;
  message: any;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];

  constructor(private cd: ChangeDetectorRef,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private titleService: Title,
    private appService: AppService,
    private apiService: ApiService,
    private NgRxAPI: CategoryRepository) {
    this.titleService.setTitle("CDC -Category");
    const d: any = localStorage.getItem("userData");
    this.userData = JSON.parse(d);
  }

  ngOnInit(): void {
    this.fatchData();
  }


  fatchData() {
    this.isProceess = true;
    this.masterName = "/category";

    this.subscription = this.apiService.getAll(this.masterName).pipe(take(1)).subscribe(
        (response) => {
          this.data = response;
          this.isProceess = false;
          this.cd.detectChanges();
        },
        (error) => {
          console.error('Error fetching items:', error);
          this.isProceess = false;
        }
      );
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
    const modalRef = this.modalService.open(AddEditeCategoryComponent, { size: "sm" });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    modalRef.result.then((data: CategoryMasterModel) => {
      if (data) {
        var model: CategoryMasterModel = {
          categoryName: data.categoryName.trim(),
          createdBy: this.userData.userId,
          status: data.status,
        }
        this.masterName = `/category`;
        let addData: any = {
          url: this.masterName,
          model: model
        }
        this.isProceess = true;
        this.subscription = this.apiService.add(addData).pipe(take(1)).subscribe(
          (response) => {
            this.isProceess = false;
            this.fatchData();
            this.message = response.message;
            this.toastr.success(this.message);
          },
          (error) => {
            this.isProceess = false;
            this.toastr.error("Category details not saved");
          }
        );
      }
    })
      .catch(() => { });
  }
  onEdit(dataItem: CategoryMasterModel) {
    this.isProceess = true;
    const modalRef = this.modalService.open(AddEditeCategoryComponent, { size: "sm" });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as AddEditeCategoryComponent;
    componentInstance.categoryMaster = dataItem;
    modalRef.result.then((data: CategoryMasterModel) => {
      if (data) {
        var model: CategoryMasterModel = {
          updatedBy: this.userData.userId,
          categoryName: data.categoryName.trim(),
          status: data.status,
          categoryId: dataItem.categoryId
        }
        this.masterName = `/category/${dataItem?.categoryId}`
        let updateData: any = {
          url: this.masterName,
          model: model
        }
        this.isProceess = true;
        this.subscription = this.apiService.update(updateData).pipe(take(1)).subscribe(res => {

          this.toastr.success(res.message);
          this.isProceess = false;
          this.fatchData();

        }, error => {
          this.toastr.error(error.message);
          this.isProceess = false;
        });
      }
    }).catch(() => {

    });
  }

  onViewDetail(dataItem: CategoryMasterModel) {
    this.isProceess = true;
    const modalRef = this.modalService.open(ViewCategoryComponent, { size: "lg", centered: true, backdrop: "static" });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as ViewCategoryComponent;
    componentInstance.categoryMaster = dataItem;
  }
  onDelete(dataItem: CategoryMasterModel) {
    this.isProceess = true;
    const modalRef = this.modalService.open(ConfirmationDialogModalComponent, { size: "sm", centered: true, backdrop: "static" });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as ConfirmationDialogModalComponent;
    componentInstance.message = "Are you sure you want to delete this Delete ?";
    modalRef.result.then((canDelete: boolean) => {
      if (canDelete) {
        this.masterName = `/category/${dataItem?.categoryId}`;
        this.isProceess = true;
        this.subscription = this.apiService.deleteID(this.masterName).pipe(take(1)).subscribe(res => {
          this.isProceess = false;
          this.toastr.success(res.message);
          this.fatchData();
        }, error => {
          this.isProceess = false;
          this.toastr.error(error.message);
        });
      }
    }).catch(() => {

    });
  }
  onDownload() {
    const exportData = this.data.map(x => {
      let updatedBy: any = ' '
      if (x.updatedBy?.firstName != undefined) {
        updatedBy = x.updatedBy?.firstName + ' ' + x.updatedBy?.lastName
      }
      else {
        updatedBy = ''
      }
      return {
        "Id": x.categoryId || '',
        "Category Name": x.categoryName || '',
        "Created By": x.createdBy?.firstName + ' ' + x.createdBy?.lastName || '',
        "Created Date": moment(x.createdDate || '').format("llll"),
        "Updated By": updatedBy,
        "Updated Date": moment(x.updatedDate || '').format("llll"),
        "Status": x.status ? 'Active' : 'Deactivate'
      }
    });
    const headers = ["Id", "Category Name",
      "Created By", "Created Date", "Updated By", "Updated Date", "Status"
    ];
    this.appService.exportAsExcelFile(exportData, "Category-Master", headers);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();

  }
}
