import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngxs/store';
import { BadRequestResponse } from '@play.app/types/Response/BadRequestResponse';
import { DeleteEdiVariable } from 'apps/admin/src/app/@store/Actions/edi.actions';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, startWith, Subscription } from 'rxjs';
@Component({
  selector: 'play-app-admin-edi-variable-delete',
  templateUrl: './edi-variable-delete.component.html',
  styleUrls: ['./edi-variable-delete.component.scss'],
})
export class EdiVariableDeleteComponent implements OnInit, OnDestroy {
  @Input() variableOptions: string[] = []; //all org names
  @Output() refresh = new EventEmitter<void>(); //emit when we press refresh button
  faTrash = faTrash;
  filteredVariableOptions: Observable<string[]> | undefined; //options of Title Of Models
  variableControl = new FormControl(''); //control of auto complete, so we can search id of spesific OrgName (updateForm)
  subscription: Subscription | undefined; //to manage subscription
  loading = false;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
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

  deleteEdiVariable(variableControl: FormControl) {
    try {
      this.loading = true;
      if (this.variableControl.value === '') {
        this.toastr.error();
        this.loading = false;
        return;
      }

      //if we select we want to delete it
      //find id of variable
      const id = this.store
        .selectSnapshot((state) => state.edi.ediVariables)
        .find((variable: any) => variable.title === variableControl.value).id;
      this.subscription = this.store
        .dispatch(new DeleteEdiVariable({ id: id }))
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
            this.toastr.success('Edi Variable deleted successfully');
            this.variableControl.patchValue('');
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
