import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { EdiModel } from '@play.app/types/Edi/EdiModel';
import { BadRequestResponse } from '@play.app/types/Response/BadRequestResponse';
import { UpdateEdiModel } from 'apps/admin/src/app/@store/Actions/edi.actions';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { faSync } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'play-app-admin-model-update',
  templateUrl: './edi-model-update.component.html',
  styleUrls: ['./edi-model-update.component.scss'],
})
export class EdiModelUpdateComponent implements OnInit, OnDestroy {
  //Form to update A Model
  updateForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    segmentTerminator: new FormControl('', [
      Validators.required,
      Validators.maxLength(1),
    ]),
    subElementSeparator: new FormControl('', [
      Validators.required,
      Validators.maxLength(1),
    ]),
    elementSeparator: new FormControl('', [
      Validators.required,
      Validators.maxLength(1),
    ]),
  });
  showForm = false;
  loading = false;
  faSync = faSync;
  subscription: Subscription | undefined; //to destroy subscription after request
  modelControl = new FormControl(''); //control of auto complete, so we can search id of spesific OrgName (updateForm)
  orgControl = new FormControl('');
  @Input() titleModels: string[] = []; //pass from parent component (All users of database)
  @Input() organizationNames: string[] = []; //all org names
  @Output() refresh = new EventEmitter<void>(); //emit when we press refresh button
  filteredTitleModelOptions: Observable<string[]> | undefined; //options of Title Of Models
  filteredOptions: Observable<string[]> | undefined; //options of Org Names
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private store: Store, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.filteredTitleModelOptions = this.modelControl.valueChanges.pipe(
      //filtering to options base what we are typing
      //every type we typing checking for possible options
      startWith(''),
      map((value) => this._filterTitleModel(value || ''))
    );

    this.filteredOptions = this.orgControl.valueChanges.pipe(
      //filtering to options base what we are typing
      //every type we typing checking for possible options
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): any {
    //filter base on what we searching
    const filterValue = value.toLowerCase();
    return this.organizationNames.filter((option) =>
      option.includes(filterValue)
    );
  }

  private _filterTitleModel(value: string): any {
    //filter base on what we searching
    const filterValue = value.toLowerCase();
    return this.titleModels.filter((option) => option.includes(filterValue));
  }

  //edimodel that we want to update
  getEdiModel(control: FormControl) {
    if (control.value === '') {
      this.toastr.error();
      return;
    }

    //get current edi model to display in update form
    const ediModel = this.store
      .selectSnapshot((state) => state.edi.ediModels)
      .find((model: any) => model.title === control.value);
    this.updateForm.patchValue({
      //update form with current values
      title: ediModel.title,
      segmentTerminator: ediModel.segmentTerminator,
      subElementSeparator: ediModel.subElementSeparator,
      elementSeparator: ediModel.elementSeparator,
    });

    const org_Name = this.store
      .selectSnapshot((state) => state.edi.ediOrganizations)
      .find((org: any) => org.id === ediModel.org_Id).name; //get org name base on org id
    this.orgControl.patchValue(org_Name); //patch value to update form at org name

    this.showForm = true; //show form only when we select model
  }

  updateModel(control: FormControl) {
    try {
      this.loading = true; //set loading to true
      if (this.orgControl.value === '') {
        this.toastr.error();
        this.loading = false;
        return;
      }

      if (this.modelControl.value === '') {
        this.toastr.error();
        this.loading = false;
        return;
      }
      if (this.updateForm.invalid) {
        this.toastr.error();
        this.loading = false;
        return;
      }

      const id = this.store
        .selectSnapshot((state) => state.edi.ediModels)
        .find((model: any) => model.title === control.value).id; //get id of model base on model name that we are selecting

      const orgId = this.store
        .selectSnapshot((state) => state.edi.ediOrganizations)
        .find((org: any) => org.name === this.orgControl.value).id; //get id of org base on org name that we are selecting

      const ediModel: EdiModel = {
        title: this.updateForm.value.title || '',
        segmentTerminator: this.updateForm.value.segmentTerminator || '',
        subElementSeparator: this.updateForm.value.subElementSeparator || '',
        elementSeparator: this.updateForm.value.elementSeparator || '',
        id: id,
        org_Id: orgId,
        enabled: true,
      };

      this.subscription = this.store
        .dispatch(new UpdateEdiModel({ ediModel: ediModel }))
        .subscribe({
          next: (response) => {
            console.log('Updated');
          },
          error: (err) => {
            if (err.status === 400) {
              const badRequestResponse: BadRequestResponse = err.error;
              this.toastr.error();
              this.loading = false;
            } else {
              throw err;
            }
          },
          complete: () => {
            this.toastr.success('Model updated successfully');
            this.loading = false;
            this.updateForm.reset(); //reset form
            this.orgControl.patchValue(''); //reset org name
            this.modelControl.patchValue(''); //reset model name
            this.refreshData(); //fetching with new values
          },
        });
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  }

  refreshData() {
    this.refresh.emit();
  }

  ngOnDestroy(): void {
    //destroy subscription
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
