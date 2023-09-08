import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryMasterModel } from 'src/app/_models/category';
import { servicetitleMasterModel } from 'src/app/_models/servicetitle';
import { subCategoryMasterModel } from 'src/app/_models/subCategoryMasterModel';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { SLATimelinesMasterModel } from 'src/app/_models/SLA-Timelines';
import { noLeadingSpaceValidator } from 'src/app/shared/directives/noLeadingSpaceValidator.validatot';

@Component({
  selector: 'app-add-edite-service-title',
  templateUrl: './add-edite-service-title.component.html',
  styleUrls: ['./add-edite-service-title.component.css']
})
export class AddEditeServiceTitleComponent {
  private _serviceTitleMaster: servicetitleMasterModel | undefined;
  isProceess: boolean = true;
  serviceTitleMasterForm: any;
  data: CategoryMasterModel[] = [];
  sdata: subCategoryMasterModel[] = [];
  slaData: SLATimelinesMasterModel[] = [];
  masterName?: any;
  categoryid: any;
  check: any;
  C_ID: any;
  get title(): string {
    return this._serviceTitleMaster ? "Edit Serivce Title Master" : " Add Serivce Title Master";
  }
  set serviceTitleMaster(value: servicetitleMasterModel) {
    this._serviceTitleMaster = value;
    console.log(this._serviceTitleMaster);

    this.check = value;
    if (this._serviceTitleMaster) {
      this.serviceTitleMasterForm.patchValue({
        category: this._serviceTitleMaster.subCategory?.category?.categoryId,
        status: this._serviceTitleMaster.status,
        defaultPriority: this._serviceTitleMaster.defaultPriority?.id,
        subCategoryId: this._serviceTitleMaster.subCategory?.subCategoryId,
        serviceName: this._serviceTitleMaster.serviceName,
      });
      // this.serviceTitleMasterForm.controls["subCategoryId"].disable();
    }
  }
  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private apiService: ApiService
  ) {
    this.serviceTitleMasterForm = this.formBuilder.group({
      category: ['', [Validators.required]],
      status: [true, [Validators.required]],
      defaultPriority: ['', [Validators.required]],
      subCategoryId: ['', [Validators.required]],
      serviceName: ["", [
        Validators.required,
        noLeadingSpaceValidator(),
        ]],
    });
  }
  ngOnInit(): void {
    this.fatchData();
    if (this._serviceTitleMaster) {
      this.subCategory();
    }
    this.activeIssue();
  }
  activeIssue() {
    this.isProceess = true;
    this.masterName = "/SLA/active"
    this.apiService.getAll(this.masterName).subscribe(data => {
      if (data) {
        this.slaData = data;
        this.isProceess = false;
        this.cd.detectChanges();
      }

    }, error => {
      this.isProceess = false;
    });
  }

  fatchData() {
    this.isProceess = true;
    this.masterName = "/category/active"
    this.apiService.getAll(this.masterName).subscribe(data => {
      if (data) {
        this.data = data;
        this.isProceess = false;
        this.cd.detectChanges();
      }
    }, error => {
      this.isProceess = false;
    })
  }
  subCategory() {
    this.isProceess = true;
    this.categoryid = this._serviceTitleMaster;
    this.masterName = `/subcategory/active/${this.categoryid.subCategory.category.categoryId}`
    this.apiService.getAll(this.masterName).subscribe(data => {
      if(data){
        this.sdata = data;
        this.isProceess = false;
        this.cd.detectChanges();
      }
    }, error => {
      this.isProceess = false;
    });
  }
  changed(e: any) {
    this.isProceess = true;
    this.masterName = `/subcategory/active/${e}`
    this.apiService.getAll(this.masterName).subscribe(data => {
      if(data){
        this.sdata = data;
        this.isProceess = false;
        this.cd.detectChanges();
      }
    }, error => {
      this.isProceess = false;
    });
  }
  onCancel() {
    this.activeModal.dismiss();
  }
  onSubmit() {
    if (this.serviceTitleMasterForm.valid) {
      this.activeModal.close(this.serviceTitleMasterForm.value)
    } else {
      this.serviceTitleMasterForm.controls['status'].markAsTouched();
      this.serviceTitleMasterForm.controls['category'].markAsTouched();
      this.serviceTitleMasterForm.controls['subCategoryId'].markAsTouched();
      this.serviceTitleMasterForm.controls['serviceName'].markAsTouched();
      this.serviceTitleMasterForm.controls['defaultPriority'].markAsTouched();
    }
  }
  shouldShowError(controlName: string, errorName: string) {
    return this.serviceTitleMasterForm.controls[controlName].touched && this.serviceTitleMasterForm.controls[controlName].hasError(errorName);
  }
}
