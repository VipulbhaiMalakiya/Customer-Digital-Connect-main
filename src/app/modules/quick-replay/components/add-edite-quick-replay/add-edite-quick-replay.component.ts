import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { labelMasterModel } from './../../../../_models/labels';
import { ChangeDetectorRef, Component } from '@angular/core';
import { quickrepliesModel } from 'src/app/_models/quickreplies';
import { noLeadingSpaceValidator } from 'src/app/shared/directives/noLeadingSpaceValidator.validatot';

@Component({
  selector: 'app-add-edite-quick-replay',
  templateUrl: './add-edite-quick-replay.component.html',
  styleUrls: ['./add-edite-quick-replay.component.css'],
})
export class AddEditeQuickReplayComponent {
  private _labelsMaster: quickrepliesModel | undefined;
  isProceess: boolean = false;
  data: any;
  issueForm: any;

  get title(): string {
    return this._labelsMaster ? 'Edit Quick Reply' : ' Add Quick Reply';
  }

  set issuesMaster(value: labelMasterModel) {
    this._labelsMaster = value;
    this.data = value;
    if (this._labelsMaster) {
      this.issueForm.patchValue({
        name: this._labelsMaster.name,
        description: this._labelsMaster.description,
      });
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
          noLeadingSpaceValidator(),
          ,
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
