import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { ApiService } from 'src/app/_api/rxjs/api.service';

@Component({
  selector: 'app-templets',
  templateUrl: './templets.component.html',
  styleUrls: ['./templets.component.css']
})
export class TempletsComponent implements OnInit{
  isProceess: boolean = true;
  masterName?: any;
  templetsdata:any = [];
  templet:any = {};
  term: any;
  imageURL: any = '../../../../../assets/images/ceo-template.jpeg';
  previewUrl: any;
  uploadFile?:any;
  fileurl?:any;
  constructor(
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private apiService: ApiService,) {
  }

  ngOnInit(): void {
    this.fatchData();
  }
  fatchData(){
    this.masterName = '/meta-templates';
    this.apiService
     .getAll(this.masterName)
     .pipe(take(1))
     .subscribe(
       (data) => {
         if (data) {
           this.templetsdata = data.data;
           this.templet = this.templetsdata[0];
           this.fileurl  =  this.templet?.header?.file;
           console.log(this.fileurl);

           this.isProceess = false;
           this.cd.detectChanges();
         }
       },
       (error) => {
         this.isProceess = false;
       }
     );
  }

  onView(i:any){
    this.templet = i;
    this.fileurl  =  i?.header?.file;

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
    }
    else {
      data = "null"
    }
    this.uploadFile = data;
    this.fileurl = this.uploadFile?.name


  }

  onCancel() {
    this.activeModal.dismiss();
  }

  submitForm(formData: any) {
    if (formData) {
      let data :any =  {
        templateName : this.templet.templateName,
        templateBody : {
          body:this.templet?.body?.body,
          bodyattribute:["Vipul Malakiya"]
        },
        templateHeader:{
          header:this.templet?.header?.header,
          headerFileType:this?.templet?.header?.headerFileType,
          link:this.fileurl
        }
      }
      this.activeModal.close(data)
    } else {
      console.log('Form is invalid.');
    }
  }


}
