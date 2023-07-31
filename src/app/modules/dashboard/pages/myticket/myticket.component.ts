import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChartType } from 'angular-google-charts';
import { Subscription, take, delay } from 'rxjs';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-myticket',
  templateUrl: './myticket.component.html',
  styleUrls: ['./myticket.component.css']
})
export class MyticketComponent {
  isProceess: boolean = true;
  userData: any;
  masterName?: any;
  data?: any;
  resolverData: any;
  subscription?: Subscription;
  pieChart = ChartType.PieChart;
  ColumnChart = ChartType.ColumnChart

  columnNames = ['My Ticket', 'My Ticket'];

  data1: any[] = [];
  width = 500;
  height = 400;
  title:any;

  options = {
    is3D: true,
  };
  donutOptions = {
    pieHole: 0.5
  }

  constructor(private titleService: Title,
    private apiService: ApiService,
    private cd: ChangeDetectorRef,
    private router: Router,) {
    this.titleService.setTitle("CDC - Dashboard");
    const d: any = localStorage.getItem("userData");
    this.userData = JSON.parse(d);
  }

  ngOnInit() {
    this.fatchData();
  }

  fatchData() {
    if (this.userData?.role?.roleName === 'Admin') {
      this.masterName = "/ticket/admin/statistics";
    }
    else if (this.userData?.role?.roleName !== 'Admin') {
      this.masterName = `/ticket/createdBy/statistics/${this.userData.userId}`;
      this.title = "My Tickets";
    }

    this.isProceess = true;
    this.subscription = this.apiService.getAll(this.masterName).pipe(take(1))
      .subscribe(result => {
        this.data = result;
        this.data1 = [];
        for (let row in result) {
          this.data1.push([
            result[row].name.toString(),
            result[row].total,
          ]);
        }
        this.isProceess = false;
        this.cd.detectChanges();
      }, error => {
        this.isProceess = false;
      })

  }

}
