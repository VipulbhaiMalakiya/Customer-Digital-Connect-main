import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription, take } from 'rxjs';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { customReplyMaster } from 'src/app/_models/custom-reply';
import { AppService } from 'src/app/_services/app.service';
import { AddEditeCustomReplyComponent } from 'src/app/modules/custom-reply/components/add-edite-custom-reply/add-edite-custom-reply.component';
import { ViewCustomReplyComponent } from 'src/app/modules/custom-reply/components/view-custom-reply/view-custom-reply.component';
import { BulkUploadComponent } from 'src/app/modules/shared/components/bulk-upload/bulk-upload.component';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { Title } from '@angular/platform-browser';
import { ViewRoomsComponent } from '../../components/view-rooms/view-rooms.component';
import { AddEditeRoomsComponent } from '../../components/add-edite-rooms/add-edite-rooms.component';


@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit, OnDestroy {
  isProceess: boolean = true;
  term: any;
  data: any[] = [];
  subscription?: Subscription;
  userData: any;
  masterName?: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  constructor(
    private cd: ChangeDetectorRef,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private titleService: Title,
    private appService: AppService,
    private apiService: ApiService,
  ) {
    this.titleService.setTitle("CDC -Room Master");
    const d: any = localStorage.getItem("userData");
    this.userData = JSON.parse(d);
  }

  ngOnInit(): void {
    this.fatchData();
  }

  fatchData() {
    this.isProceess = true;
    this.masterName = "/rooms";
    this.subscription = this.apiService.getAll(this.masterName).pipe(take(1)).subscribe(data => {
      if (data) {
        this.data = data.data;
        this.count = this.data.length;
        this.isProceess = false;
        this.cd.detectChanges();
      }

    }, error => {
      this.isProceess = false;
    })
  }

  onTableDataChange(event: any) {
    this.page = event;
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onAdd() {
    this.isProceess = true;
    const modalRef = this.modalService.open(AddEditeRoomsComponent, { size: "md" });
    if (modalRef) {
      this.isProceess = false;
    }
    else {
      this.isProceess = false;
    }
    modalRef.result.then((data: any) => {
      if (data) {
        var model: any = {
          roomNumber: data.roomNumber,
          roomOccupied:data.roomOccupied,
          roomStatus:data.roomStatus
        }
        this.masterName = `/rooms`;
        let addData: any = {
          url: this.masterName,
          model: model
        }
        this.isProceess = true;
        this.subscription = this.apiService.add(addData).pipe(take(1)).subscribe(res => {
          this.isProceess = false;
          this.fatchData();
          this.toastr.success(res.message);
        }, error => {
          this.isProceess = false;
          this.toastr.error(error.error.message);
          // this.toastr.error(error.message);
        });
      }
    }).catch(() => { });
  }


  onEdit(dataItem: any) {
    this.isProceess = true;
    const modalRef = this.modalService.open(AddEditeRoomsComponent, { size: "md" });
    if (modalRef) {
      this.isProceess = false;
    }
    else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as AddEditeRoomsComponent;
    componentInstance.categoryMaster = dataItem;
    modalRef.result.then((data: any) => {
      if (data) {
        var model: any = {
          roomNumber: data.roomNumber,
          roomOccupied: data.roomOccupied,
          roomStatus:data.roomStatus

        }
        this.masterName = `/rooms/roomId/${dataItem.roomId}`;
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
          this.toastr.error(error.error.message);
          this.isProceess = false;
        });
      }
    }).catch(() => { });
  }

  onViewDetail(dataItem: any) {

    const modalRef = this.modalService.open(ViewRoomsComponent, { size: "md", centered: true, backdrop: "static" });
    if (modalRef) {
      this.isProceess = false;
    }
    else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as ViewRoomsComponent;
    componentInstance.categoryMaster = dataItem;
  }

  onDownload() {
    const exportData = this.data.map(x => {

      return {
        "Id": x.roomId,
        "Number": x.roomNumber,
        "Occupied": x.roomOccupied,
        "Status": x.roomStatus,
      }
    });
    const headers = ["Id", "Number", "Occupied", "Status"];
    this.appService.exportAsExcelFile(exportData, "Room Master", headers);
  }

  onDelete(dataItem: any) {
    this.isProceess = true;
    const modalRef = this.modalService.open(ConfirmationDialogModalComponent, { size: "sm", centered: true, backdrop: "static" });
    if (modalRef) {
      this.isProceess = false;
    }
    else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as ConfirmationDialogModalComponent;
    componentInstance.message = "Are you sure you want to delete this ?";
    modalRef.result.then((canDelete: boolean) => {
      if (canDelete) {
        this.masterName = `/rooms/roomId/${dataItem?.roomId}`;
        this.isProceess = true;
        this.subscription = this.apiService.deleteID(this.masterName).pipe(take(1)).subscribe(data => {
          this.isProceess = false;
          this.toastr.success(data.message);
          this.fatchData();
        }, error => {
          this.isProceess = false;
          this.toastr.error(error.error.message);
        });
      }
    }).catch(() => { });
  }
  onbulkUpload() {
    this.isProceess = true;
    const modalRef = this.modalService.open(BulkUploadComponent, { size: "md", centered: true, backdrop: "static" });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as BulkUploadComponent;
    componentInstance.heading = "Company"
    componentInstance.message = "Are you sure you want to delete this ?";
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
