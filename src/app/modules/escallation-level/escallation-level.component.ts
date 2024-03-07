import { ChangeDetectorRef, Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Subscription, take } from 'rxjs';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { slaMasterModel } from 'src/app/_models/sla';
import { AppService } from 'src/app/_services/app.service';
import { ViewSlaComponent } from '../sla/components/view-sla/view-sla.component';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-escallation-level',
    templateUrl: './escallation-level.component.html',
    styleUrls: ['./escallation-level.component.css']
})
export class EscallationLevelComponent {

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
    level?: any;


    constructor(
        private cd: ChangeDetectorRef,
        private modalService: NgbModal,
        private toastr: ToastrService,
        private titleService: Title,
        private appService: AppService,
        private apiService: ApiService,
        private route: ActivatedRoute,
    ) {
        this.titleService.setTitle("CDC -Escalation Level");
        const d: any = localStorage.getItem("userData");
        this.userData = JSON.parse(d);
    }

    ngOnInit(): void {
   

        this.route.params.subscribe(params => {
            this.level = params['id'];
            this.masterName = `/chatlist/chat-escalation?escallationLevel=${this.level}`;
            this.fatchData();
        });
        

    }

    fatchData() {
        this.isProceess = true;
    
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
    onDownload() {
        const exportData = this.data.map(x => {
    

            return {
                "Id": x.slaId || '',
                "Department": x.department?.departmentName || '',
                "Escalation By": x.escalatedBy?.username || '',
                "Level": x.escationlevel || '',
                "Time": x.time || '',
              
      
            }
        });
        const headers = [
            "Id", "Department",'Escalation By','Level','Time'
        ];
        this.appService.exportAsExcelFile(exportData, "Escalation Level", headers);
    }



    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    onViewDetail(dataItem: slaMasterModel) {
        this.isProceess = true;
        const modalRef = this.modalService.open(ViewSlaComponent, { size: "xl", centered: true, backdrop: "static" });
        if (modalRef) {
            this.isProceess = false;
        } else {
            this.isProceess = false;
        }
        var componentInstance = modalRef.componentInstance as ViewSlaComponent;
        componentInstance.serviceTitleMaster = dataItem;
    }
}
