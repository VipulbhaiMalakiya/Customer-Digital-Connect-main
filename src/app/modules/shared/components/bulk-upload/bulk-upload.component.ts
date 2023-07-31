import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html'
})
export class BulkUploadComponent {
  heading: string = '';
  message: string = '';
  isProceess: boolean = true;
  bulkUploadForm: any;
  uploadFile: any = "";
  abc: any;


  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.bulkUploadForm = this.formBuilder.group({
      file: ['', [Validators.required]]
    });
  }

  onCancel() {
    this.activeModal.close(false);
  }


  onFileChange(event: any) {
    let data;
    if (event.target.files && event.target.files[0])
      this.abc = event.target.files[0]
    if (event.target.files[0].name) {
      data = event.target.files[0].name;
    }
    else {
      data = ""
    }
    this.uploadFile = data;


  }

  onSubmit() {
    if (this.bulkUploadForm.valid) {
      console.log(this.uploadFile);

      // this.activeModal.close(this.companyMasterForm.value)
    } else {
      this.bulkUploadForm.controls['file'].markAsTouched();

    }
  }

  shouldShowError(controlName: string, errorName: string) {
    return this.bulkUploadForm.controls[controlName].touched && this.bulkUploadForm.controls[controlName].hasError(errorName);
  }
}
