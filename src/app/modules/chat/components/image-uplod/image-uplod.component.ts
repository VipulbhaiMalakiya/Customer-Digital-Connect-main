import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-image-uplod',
  templateUrl: './image-uplod.component.html',
  styleUrls: ['./image-uplod.component.css']
})
export class ImageUplodComponent {
  isProceess: boolean = true;
  customersMasterForm: any;
  uploadFile: any = "";
  check: any
  imageLoaded = false;
  imageURL: any = '../../../../../assets/images/default-nopic.jpg';
  previewUrl: any;


  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef) {
    this.isProceess = false;

    this.customersMasterForm = this.formBuilder.group({
      image: ['', [Validators.required, this.imageFileValidator]]
    });
  }

  imageFileValidator(control: FormControl) {
    const file = control.value;
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        return { fileType: true };
      }
    }
    return null;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.customersMasterForm.get('image').setValue(file);
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
  }

  onCancel() {
    this.activeModal.dismiss();
  }
  onSubmit() {
    if (this.customersMasterForm.valid) {
      let data = {
        file: this.uploadFile || null,
      }
      this.activeModal.close(data)
    } else {
      this.toastr.error("Only image files are allowed.");
    }
  }

  shouldShowError(controlName: string, errorName: string) {
    return this.customersMasterForm.controls[controlName].touched && this.customersMasterForm.controls[controlName].hasError(errorName);
  }
}
