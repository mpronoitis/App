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
import { EdiSegment } from '@play.app/types/Edi/EdiSegment';
import { BadRequestResponse } from '@play.app/types/Response/BadRequestResponse';
import { AddEdiSegment } from 'apps/admin/src/app/@store/Actions/edi.actions';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'play-app-admin-edi-segment-add',
  templateUrl: './edi-segment-add.component.html',
  styleUrls: ['./edi-segment-add.component.scss'],
})
export class EdiSegmentAddComponent implements OnInit, OnDestroy {
  //Form to add segment
  addForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  @Input() modelNames: string[] = []; //pass from parent component (All users of database)
  @Output() refresh = new EventEmitter<void>(); //emit when we press refresh button
  modelControl = new FormControl('');
  loading = false;
  faAdd = faAdd;
  subscription: Subscription | undefined; //to destroy subscription after request
  filteredOptions: Observable<string[]> | undefined; //options of model Names
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private store: Store, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.filteredOptions = this.modelControl.valueChanges.pipe(
      //al Models
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

  addSegment(control: FormControl) {
    this.loading = true;
    try {
      if (this.addForm.invalid || control.value === '') {
        this.toastr.error();
        this.loading = false;
        return;
      }

      //if form fields is ok
      const modelId = this.store.selectSnapshot((state) =>
        state.edi.ediModels.find((model: any) => model.title === control.value)
      ).id;
      const ediSegment: EdiSegment = {
        id: '00000000-0000-0000-0000-000000000000',
        title: this.addForm.value.title || '',
        description: this.addForm.value.description || '',
        model_Id: modelId,
      };

      this.subscription = this.store
        .dispatch(new AddEdiSegment({ ediSegment: ediSegment }))
        .subscribe({
          next: (response) => {
            console.log(response);
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
            this.loading = false;
            this.toastr.success('Edi Segment added successfully');
            this.addForm.reset();
            this.refreshData();
            this.modelControl.patchValue('');
          },
        });
    } catch (err) {
      console.log(err);
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
