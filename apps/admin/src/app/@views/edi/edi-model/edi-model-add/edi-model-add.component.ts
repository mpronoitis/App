import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { EdiModel } from '@play.app/types/Edi/EdiModel';
import { AddEdiModel } from 'apps/admin/src/app/@store/Actions/edi.actions';
import { BadRequestResponse } from '@play.app/types/Response/BadRequestResponse';
@Component({
  selector: 'play-app-admin-model-add',
  templateUrl: './edi-model-add.component.html',
  styleUrls: ['./edi-model-add.component.scss'],
})
export class EdiModelAddComponent implements OnInit, OnDestroy {
  //Form to add model
  addForm = new FormGroup({
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
  faAdd = faAdd;
  loading = false;
  subscription: Subscription | undefined; //to destroy subscription after request
  myControl = new FormControl(''); //control of auto complete, so we can search id of spesific OrgName (addForm)
  filteredOptions: Observable<string[]> | undefined; //options of Org Names
  @Input() organizationNames: string[] = []; //pass from parent component (All users of database)
  @Output() refresh = new EventEmitter<void>(); //emit when we press refresh button
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private store: Store, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
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

  //add model to database
  addModel(control: FormControl) {
    try {
      this.loading = true; //set loading to true
      if (this.addForm.invalid || control.value === '') {
        this.toastr.error();
        this.loading = false;
        return;
      }

      const orgId = this.store
        .selectSnapshot((state) => state.edi.ediOrganizations)
        .find((org: any) => org.name === control.value).id; //get id of org base on org name that we are selecting

      const model: EdiModel = {
        //create model
        title: this.addForm.value.title || '',
        segmentTerminator: this.addForm.value.segmentTerminator || '',
        subElementSeparator: this.addForm.value.subElementSeparator || '',
        elementSeparator: this.addForm.value.elementSeparator || '',
        org_Id: orgId,
        enabled: true,
        id: '00000000-0000-0000-0000-000000000000', //guid
      };
      this.subscription = this.store //dispatch action to add model
        .dispatch(new AddEdiModel({ ediModel: model }))
        .subscribe({
          next: (response) => {
            //Model Added Successfully
            console.log(response);
          },
          error: (err) => {
            //if error occurs display it
            if (err.status === 400) {
              const badRequestResponse: BadRequestResponse = err.error;
              this.toastr.error();
              this.loading = false;
            } else {
              throw err;
            }
          },
          complete: () => {
            //when subscription completes show message and hide spinner
            this.toastr.success('Model added successfully');
            this.loading = false;
            this.addForm.reset(); //reset form
            this.myControl.patchValue(''); //reset org name
            this.refreshData(); //fetching with new values
          },
        });
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  }

  refreshData() {
    this.refresh.emit(); //emit to parent component to refresh data
  }

  ngOnDestroy(): void {
    //destroy subscription
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
