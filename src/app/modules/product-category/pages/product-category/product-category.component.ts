import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { AddEditeProductCategoryComponent } from '../../components/add-edite-product-category/add-edite-product-category.component';
import { ViewProductCategoryComponent } from '../../components/view-product-category/view-product-category.component';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { Subscription, delay, take } from 'rxjs';
import { prodactCategoryMasterModel } from 'src/app/_models/prodact_category';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { TickitService } from 'src/app/_api/masters/tickit.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { AppService } from 'src/app/_services/app.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit, OnDestroy {
  isProceess: boolean = true;
  term: any;
  data: prodactCategoryMasterModel[] = [];
  subscription?: Subscription;
  userData: any;
  page: number = 1;
  public isLoading = true;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  masterName?: any;

  constructor(
    private cd: ChangeDetectorRef,
    private modalService: NgbModal,
    private titleService: Title,
    private toastr: ToastrService,
    public masterAPI: TickitService,
    private apiService: ApiService,
    private appService: AppService,
  ) {
    this.titleService.setTitle("CDC - Product Category");
    const d: any = localStorage.getItem("userData");
    this.userData = JSON.parse(d);
  }

  ngOnInit(): void {
    this.fatchData();
  }


  onImageLoad() {
    this.isLoading = false;
  }

  fatchData() {
    this.isProceess = true;
    this.masterName = "/productCategory";
    this.subscription = this.apiService.getAll(this.masterName).pipe(take(1)).subscribe(data => {
      if (data) {
        this.data = data.data;
        this.isProceess = false;
        this.cd.detectChanges();
      }
    }, error => {
      this.isProceess = false;
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
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
    const modalRef = this.modalService.open(AddEditeProductCategoryComponent, { size: "xl" });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    modalRef.result.then((data: prodactCategoryMasterModel) => {
      if (data) {
        var model: any = {
          createdBy: this.userData.userId,
          productCategoryName: data.productCategoryName,
          status: data.status,
          productCategoryDescription: data.productCategoryDescription
        }

        let formData = new FormData();

        if (data.file === null) {

        } else {
          formData.append('file', data.file);
        }

        formData.append("userData", JSON.stringify(model));
        this.isProceess = true;
        this.subscription = this.masterAPI.saveProdactCategoryMasterData(formData).pipe(take(1)).subscribe(responseData => {
          if (responseData) {
            let idata: any = responseData;
            if (idata.code == 200) {
              this.isProceess = false;
              this.toastr.success(idata.message);
              this.fatchData();
            }
          }
        }, error => {
          this.isProceess = false;
          this.toastr.error(error.error.message);
        });
      }
    }).catch(() => { });
  }

  onViewDetail(dataItem: prodactCategoryMasterModel) {
    this.isProceess = true;
    const modalRef = this.modalService.open(ViewProductCategoryComponent, { size: "xl", centered: true, backdrop: "static" });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as ViewProductCategoryComponent;
    componentInstance.prodactCatMaster = dataItem;
  }

  onEdit(dataItem: prodactCategoryMasterModel) {
    this.isProceess = true;
    const modalRef = this.modalService.open(AddEditeProductCategoryComponent, { size: "xl" });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as AddEditeProductCategoryComponent;
    componentInstance.prodactCatMaster = dataItem;

    modalRef.result.then((data: prodactCategoryMasterModel) => {
      if (data) {
        var model: any = {
          productCategoryName: data.productCategoryName,
          status: data.status,
          productCategoryDescription: data.productCategoryDescription,
          updatedBy: this.userData.userId,
        }
        let formData = new FormData();
        if (data.file === null) {

        } else {
          formData.append('file', data.file);
        }
        formData.append("userData", JSON.stringify(model));
        this.isProceess = true;
        this.subscription = this.masterAPI.procatupdateMasterData(formData, dataItem.productCategoryId).pipe(take(1)).subscribe(responseData => {
          if (responseData) {
            let idata: any = responseData;
            if (idata.code == 200) {
              this.isProceess = false;
              this.toastr.success(idata.message);
              this.fatchData();
            }
          }
        }, error => {
          this.isProceess = false;
          this.toastr.error(error.error.message);
        });
      }
    }).catch(() => { });

  }

  onDelete(dataItem: prodactCategoryMasterModel) {
    this.isProceess = true;
    const modalRef = this.modalService.open(ConfirmationDialogModalComponent, { size: "sm", centered: true, backdrop: "static" });
    if (modalRef) {
      this.isProceess = false;
    }
    else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as ConfirmationDialogModalComponent;
    componentInstance.message = "Are you sure you want to delete this Prodact Category master?";

    modalRef.result.then(async (canDelete: boolean) => {
      if (canDelete) {
        this.masterName = `/productCategory/${dataItem?.productCategoryId}`;
        this.isProceess = true;
        this.subscription = await this.apiService.deleteID(this.masterName).pipe(take(1)).subscribe(data => {
          if (data) {
            let idata: any = data;
            if (idata.code == 200) {
              this.isProceess = false;
              this.toastr.success(idata.message);
              this.fatchData();
            }
          }
        }, error => {
          this.isProceess = false;
          this.toastr.error("Error while deleting Prodact Category!");
        });
      }
    }).catch(() => { });
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
        "Id": x.productCategoryId || '',
        "Name": x.productCategoryName || '',
        "Description": x.productCategoryDescription || '',
        "Created By": x.createdBy?.firstName + ' ' + x.createdBy?.lastName || '',
        "Created Date": moment(x.createdDate || '').format("llll"),
        "Updated By": updatedBy,
        "Updated Date": moment(x.updatedDate || '').format("llll"),
        "Status": x.status ? 'Active' : 'Deactivate'
      }
    });
    const headers = ["Id", "Name", "Description",
      "Created By", "Created Date", "Updated By", "Updated Date", "Status"
    ];
    this.appService.exportAsExcelFile(exportData, "Prodact-Category-Master", headers);
  }
}
