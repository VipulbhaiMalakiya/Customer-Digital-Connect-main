import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { ApiService } from 'src/app/_api/rxjs/api.service';

@Component({
  selector: 'app-templets',
  templateUrl: './templets.component.html',
  styleUrls: ['./templets.component.css'],
})
export class TempletsComponent implements OnInit {
  isProceess: boolean = true;
  masterName?: any;
  templetsdata: any = [];
  templet: any = {};
  dataArray: any[] = [];
  term: any;
  imageURL: any = '../../../../../assets/images/ceo-template.jpeg';
  previewUrl: any;
  uploadFile?: any;
  username: any;
  set issuesMaster(value: any) {
    this.username = value;
  }
  constructor(
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.fatchData();
  }
  fatchData() {
    this.masterName = '/meta-templates';
    this.apiService
      .getAll(this.masterName)
      .pipe(take(1))
      .subscribe(
        (data) => {
          if (data) {
            this.templetsdata = data.data;
            this.templet = this.templetsdata[0];
            this.isProceess = false;
            this.cd.detectChanges();
          }
        },
        (error) => {
          this.isProceess = false;
        }
      );
  }

  onView(i: any) {
    this.templet = i;
    console.log(this.templet);
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    // this.customersMasterForm.get('image').setValue(file);
    // Image preview
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
    reader.readAsDataURL(file);

    let data;
    if (event.target.files && event.target.files[0])
      data = event.target.files[0];
    if (event.target.files[0].name && event.target.files.length > 0) {
      data = event.target.files[0];
    } else {
      data = 'null';
    }
    this.uploadFile = data;
  }

  onCancel() {
    this.activeModal.dismiss();
  }

  onSubmit(f: NgForm) {
    if (f.invalid) {
      return;
    }
    {
      let name = this.username;
      let email = f.value.input2;
      let password = f.value.input3;

      if (name && email && password) {
        const newData = [name, email, password];
        this.dataArray.push(newData);
      } else if (name && email) {
        const newData = [name, email];
        this.dataArray.push(newData);
      } else if (name) {
        const newData = [name];
        this.dataArray.push(newData);
      }
      this.dataArray = [].concat(...this.dataArray);

      let data: any = {
        templateName: this.templet.templateName,
        templateBody: {
          body: this.templet?.body?.body,
          bodyattribute: this.dataArray,
        },
        templateHeader: {
          header: this.templet?.header?.header,
          headerFileType: this?.templet?.header?.headerFileType,
          link: this.templet?.header?.file,
        },
      };
      this.activeModal.close(data);
    }
  }
}
