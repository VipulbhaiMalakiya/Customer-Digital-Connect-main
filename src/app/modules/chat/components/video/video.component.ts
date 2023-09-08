import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { noLeadingSpaceValidator } from 'src/app/shared/directives/noLeadingSpaceValidator.validatot';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent {
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
      image: ['', [Validators.required, this.videoFileValidator]],
      caption: ["", [
        Validators.required,

        noLeadingSpaceValidator(),
        ]],
    });
  }


  videoFileValidator(control: FormControl) {
    const file = control.value;
    if (file) {
      const allowedTypes = ['video/mp4', 'video/avi', 'video/mkv', 'video/mov'];
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
      this.customersMasterForm.controls['caption'].markAsTouched();
      this.toastr.error(" Only video files (mp4, avi, mkv, mov) are allowed.");
    }
  }

  shouldShowError(controlName: string, errorName: string) {
    return this.customersMasterForm.controls[controlName].touched && this.customersMasterForm.controls[controlName].hasError(errorName);
  }
}

