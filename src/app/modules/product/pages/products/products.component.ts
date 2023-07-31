import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { ViewProductsComponent } from '../../components/view-products/view-products.component';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { AddEditeProductsComponent } from '../../components/add-edite-products/add-edite-products.component';
import { Subscription, take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TickitService } from 'src/app/_api/masters/tickit.service';
import { prodactMasterModel } from 'src/app/_models/prodact';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { AppService } from 'src/app/_services/app.service';
import * as moment from 'moment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  isProceess: boolean = false;
  term: any;
  data: prodactMasterModel[] = [];
  subscription?: Subscription;
  userData: any;
  public isLoading = true;
  masterName?: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];


  constructor(
    private cd: ChangeDetectorRef,
    private modalService: NgbModal,
    private titleService: Title,
    private toastr: ToastrService,
    public masterAPI: TickitService,
    private apiService: ApiService,
    private appService: AppService,) {
    this.titleService.setTitle("CDC - Product");
    const d: any = localStorage.getItem("userData");
    this.userData = JSON.parse(d);
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
  ngOnInit(): void {
    this.fatchData();
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
        "Id": x.productId || '',
        "serialNo": x.serialNo || '',
        "Product Name": x.productName || '',
        "Description": x.productDescription || '',
        "options": x.options || '',
        "leter tprice": x.productPrices?.lt1price || '',
        "Piece Price": x.productPrices?.PiecePrice || '',
        "250 GM Price": x.productPrices?.GM250Price || '',
        "500 GM Price": x.productPrices?.GM500Price || '',
        "KG Price": x.productPrices?.KG1Price || '',
        "file": x.fileUrl || '',
        "Created By": x.createdBy?.firstName + ' ' + x.createdBy?.lastName || '',
        "Created Date": moment(x.createdDate || '').format("llll"),
        "Updated By": updatedBy,
        "Updated Date": moment(x.updatedDate || '').format("llll"),
        "Status": x.status ? 'Active' : 'Deactivate'
      }
    });
    const headers = ["Id", "serialNo", "Product Name", "Description", "options", "leter tprice",
      "Piece Price", "250 GM Price", "500 GM Price", "KG Price", "file",
      "Created By", "Created Date", "Updated By", "Updated Date", "Status"
    ];
    this.appService.exportAsExcelFile(exportData, "Prodact-Master", headers);
  }
  onImageLoad() {
    this.isLoading = false;
  }
  fatchData() {
    this.isProceess = true;
    this.masterName = "/product";
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
  onAdd() {
    this.isProceess = true;
    const modalRef = this.modalService.open(AddEditeProductsComponent, { size: "xl", centered: true, backdrop: "static" });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    modalRef.result.then((data: any) => {
      if (data) {
        var model: any = {
          createdBy: this.userData.userId,
          productName: data.productName,
          productDescription: data.productDescription,
          productPrices: {
            lt1price: data.LT1Price || 0,
            GM250Price: data.GM250Price || 0,
            GM500Price: data.GM500Price || 0,
            KG1Price: data.KG1Price || 0,
            PiecePrice: data.PiecePrice || 0
          },
          ischeckboxLT1: data.checkbox1LT,
          ischeckboxGM250: data.checkbox250GM,
          ischeckboxGM500: data.checkbox500GM,
          ischeckboxKG1: data.checkbox1KG,
          ischeckboxPiece: data.isCheckPiece,
          options: data.Option,
          status: data.status,
          productCategoryId: data.productCategoryId
        }
        let formData = new FormData();
        if (data.file === null) {
        } else {
          formData.append('file', data.file);
        }
        formData.append("userData", JSON.stringify(model));
        this.isProceess = true;
        this.subscription = this.masterAPI.saveProdactMasterData(formData).pipe(take(1)).subscribe(responseData => {
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

  onViewDetail(dataItem: prodactMasterModel) {
    this.isProceess = true;
    const modalRef = this.modalService.open(ViewProductsComponent, { size: "xl", centered: true, backdrop: "static" });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }

    var componentInstance = modalRef.componentInstance as ViewProductsComponent;
    componentInstance.prodactMaster = dataItem;

  }

  onDelete(dataItem: prodactMasterModel) {
    this.isProceess = true;
    const modalRef = this.modalService.open(ConfirmationDialogModalComponent, { size: "sm", centered: true, backdrop: "static" });
    if (modalRef) {
      this.isProceess = false;
    }
    else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as ConfirmationDialogModalComponent;
    componentInstance.message = "Are you sure you want to delete this Prodact master?";

    modalRef.result.then(async (canDelete: boolean) => {
      if (canDelete) {
        this.masterName = `/product/${dataItem?.productId}`;
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

  onEdit(dataItem: prodactMasterModel) {
    this.isProceess = true;
    const modalRef = this.modalService.open(AddEditeProductsComponent, { size: "xl" });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as AddEditeProductsComponent;
    componentInstance.prodactMaster = dataItem;

    modalRef.result.then((data: any) => {
      if (data) {
        var model: any = {
          createdBy: this.userData.userId,
          productName: data.productName,
          productDescription: data.productDescription,
          productPrices: {
            lt1price: data.LT1Price || 0,
            GM250Price: data.GM250Price || 0,
            GM500Price: data.GM500Price || 0,
            KG1Price: data.KG1Price || 0,
            PiecePrice: data.PiecePrice || 0
          },
          ischeckboxLT1: data.checkbox1LT,
          ischeckboxGM250: data.checkbox250GM,
          ischeckboxGM500: data.checkbox500GM,
          ischeckboxKG1: data.checkbox1KG,
          ischeckboxPiece: data.isCheckPiece,
          options: dataItem?.options,
          status: data.status,
          productCategoryId: data.productCategoryId
        }
        let formData = new FormData();
        if (data.file === null) {

        } else {
          formData.append('file', data.file);
        }
        formData.append("userData", JSON.stringify(model));
        this.isProceess = true;
        this.subscription = this.masterAPI.procatupdatData(formData, dataItem.productId).pipe(take(1)).subscribe(responseData => {
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
}
