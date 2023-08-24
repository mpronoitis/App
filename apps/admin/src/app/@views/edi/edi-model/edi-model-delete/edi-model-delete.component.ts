import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { DeleteEdiModel } from 'apps/admin/src/app/@store/Actions/edi.actions';
import { BadRequestResponse } from '@play.app/types/Response/BadRequestResponse';
@Component({
  selector: 'play-app-admin-edi-model-delete',
  templateUrl: './edi-model-delete.component.html',
  styleUrls: ['./edi-model-delete.component.scss'],
})
export class EdiModelDeleteComponent implements OnInit, OnDestroy {
  deleteControl = new FormControl('');
  filteredTitleModelOptions: Observable<string[]> | undefined; //options of Org Names
  faTrash = faTrash;
  loading = false;
  subscription: Subscription | undefined; //to destroy subscription after request
  @Input() modelNames: string[] = []; //pass from parent component (All users of database)
  @Output() refresh = new EventEmitter<void>(); //emit when we press refresh button
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private store: Store, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.filteredTitleModelOptions = this.deleteControl.valueChanges.pipe(
      //filtering to options base what we are typing
      //every type we typing checking for possible options
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): any {
    //filter base on what we searching
    const filterValue = value.toLowerCase();
    return this.modelNames.filter((option) => option.includes(filterValue));
  }

  deleteEdiModel(control: FormControl) {
    //fucntion to delete edimodel

    try {
      this.loading = true;
      if (control.value === '') {
        this.toastr.error();
        this.loading = false;
        return;
      }
      const id = this.store
        .selectSnapshot((state) => state.edi.ediModels)
        .find((model: any) => model.title === control.value).id; //get id of model base on model name that we are selecting

      this.subscription = this.store
        .dispatch(new DeleteEdiModel({ id: id }))
        .subscribe({
          next: (response) => {
            console.log('Deleted');
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
            this.toastr.success('Model deleted successfully');
            this.loading = false;
            this.refreshData();
            this.deleteControl.patchValue(''); //reset model name
          },
        });
    } catch (error) {
      console.log(error);
      this.toastr.error();
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
