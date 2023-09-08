import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { labelMasterModel } from 'src/app/_models/labels';
import { quickrepliesModel } from 'src/app/_models/quickreplies';
import { noLeadingSpaceValidator } from 'src/app/shared/directives/noLeadingSpaceValidator.validatot';

@Component({
  selector: 'app-view-quick-replay',
  templateUrl: './view-quick-replay.component.html',
  styleUrls: ['./view-quick-replay.component.css']
})
export class ViewQuickReplayComponent {
  private _labelsMaster: quickrepliesModel | undefined;
  isProceess: boolean = false;
  data: any;
  issueForm: any;

  get title(): string {
    return this._labelsMaster ? 'Edit Quick Replay' : ' Add Quick Replay';
  }

  set issuesMaster(value: labelMasterModel) {
    this._labelsMaster = value;
    this.data = value;
    if (this._labelsMaster) {
      this.issueForm.patchValue({
        name: this._labelsMaster.name,
        description: this._labelsMaster.description,
      });
      this.issueForm.controls["description"].disable();
      this.issueForm.controls["name"].disable();
    }
  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.issueForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
          noLeadingSpaceValidator(),
          Validators.pattern('^(?!\\s*$)[a-zA-Z\\s]*$'),
        ],
      ],
      description: ['', [Validators.required, noLeadingSpaceValidator()]],
    });
  }

  onCancel() {
    this.activeModal.dismiss();
  }

  onSubmit() {
    if (this.issueForm.valid) {
      this.activeModal.close(this.issueForm.value);
    } else {
      this.issueForm.controls['name'].markAsTouched();
      this.issueForm.controls['description'].markAsTouched();
    }
  }

  shouldShowError(controlName: string, errorName: string) {
    return (
      this.issueForm.controls[controlName].touched &&
      this.issueForm.controls[controlName].hasError(errorName)
    );
  }
}
