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
import { EdiVariable } from '@play.app/types/Edi/EdiVariable';
import { BadRequestResponse } from '@play.app/types/Response/BadRequestResponse';
import { UpdateEdiVariable } from 'apps/admin/src/app/@store/Actions/edi.actions';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { faSync } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'play-app-admin-edi-variable-update',
  templateUrl: './edi-variable-update.component.html',
  styleUrls: ['./edi-variable-update.component.scss'],
})
export class EdiVariableUpdateComponent implements OnInit, OnDestroy {
  @Input() variableOptions: string[] = []; //all org names
  @Output() refresh = new EventEmitter<void>(); //emit when we press refresh button
  faSync = faSync;
  filteredVariableOptions: Observable<string[]> | undefined; //options of Title Of Models
  variableControl = new FormControl(''); //control of auto complete, so we can search id of spesific OrgName (updateForm)
  subscription: Subscription | undefined; //to manage subscription
  loading = false;
  showForm = false;
  //Form to update A Variable
  updateForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    placeholder: new FormControl('', [Validators.required]),
  });

  constructor(private store: Store, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.filteredVariableOptions = this.variableControl.valueChanges.pipe(
      //filtering to options base what we are typing
      //every type we typing checking for possible options
      startWith(''),
      map((value) => this._variableFilter(value || ''))
    );
  }

  //filterring available optons of title variables
  private _variableFilter(value: string): any {
    //filter base on what we searching
    const filterValue = value.toLowerCase();
    return this.variableOptions.filter((option) =>
      option.includes(filterValue)
    );
  }

  //method to get a signle segment when we want to update it
  getEdiVariable(variableControl: FormControl) {
    if (this.variableControl.value === '') {
      this.toastr.error();
      return;
    }

    //if we shoose edi variable
    const ediVariable = this.store
      .selectSnapshot((state) => state.edi.ediVariables)
      .find((variable: any) => variable.title === variableControl.value);

    if (ediVariable) {
      //if exists patch form with values

      this.updateForm.patchValue({
        title: ediVariable.title,
        description: ediVariable.description,
        placeholder: ediVariable.placeholder,
      });

      this.showForm = true; //show update form
    } else {
      //if not exists show error message
      this.toastr.error();
    }
  }

  updateEdiVariable() {
    try {
      this.loading = true;
      if (this.updateForm.invalid) {
        this.toastr.error();
        this.loading = false;
        return;
      }

      //if all forms are completed
      const id = this.store
        .selectSnapshot((state) => state.edi.ediVariables)
        .find(
          (variable: any) => variable.title === this.variableControl.value
        ).id;

      const ediVariable: EdiVariable = {
        id: id,
        title: this.updateForm.value.title || '',
        description: this.updateForm.value.description || '',
        placeholder: this.updateForm.value.placeholder || '',
      };
      this.subscription = this.store
        .dispatch(new UpdateEdiVariable({ ediVariable: ediVariable }))
        .subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (err) => {
            if (err.status === 400) {
              const badRequestResponse: BadRequestResponse = err.error;
              this.toastr.error();
              this.loading = false;
            } else {
              throw err; //if error is not 400, throw error
            }
          },
          complete: () => {
            this.loading = false;
            this.toastr.success('Edi Variable updated successfully');
            this.updateForm.reset(); //reset form
            this.variableControl.patchValue(''); //reset variable control
            this.refreshData(); //fetch values
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
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
