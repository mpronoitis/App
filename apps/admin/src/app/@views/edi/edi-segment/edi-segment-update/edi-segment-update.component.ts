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
import { ToastrService } from 'ngx-toastr';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { EdiSegment } from '@play.app/types/Edi/EdiSegment';
import { UpdateEdiSegment } from 'apps/admin/src/app/@store/Actions/edi.actions';
import { BadRequestResponse } from '@play.app/types/Response/BadRequestResponse';
@Component({
  selector: 'play-app-admin-edi-segment-update',
  templateUrl: './edi-segment-update.component.html',
  styleUrls: ['./edi-segment-update.component.scss'],
})
export class EdiSegmentUpdateComponent implements OnInit, OnDestroy {
  //Form to update A Segment
  updateForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  loading = false;
  faSync = faSync;
  @Input() segmentOptions: string[] = [];
  @Input() modelNames: string[] = [];
  @Output() refresh = new EventEmitter<void>(); //emit when we press refresh button

  subscription: Subscription | undefined; //to destroy subscription after request
  showForm = false;
  filteredSegmentOptions: Observable<string[]> | undefined;
  filteredModelOptions: Observable<string[]> | undefined;
  segmentControl = new FormControl('');
  modelControl = new FormControl('');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private store: Store, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.filteredModelOptions = this.modelControl.valueChanges.pipe(
      //al Models
      //filtering to options base what we are typing
      //every type we typing checking for possible options
      startWith(''),
      map((value) => this._filter(value || ''))
    );
    this.filteredSegmentOptions = this.segmentControl.valueChanges.pipe(
      //all Segments
      //filtering to options base what we are typing
      //every type we typing checking for possible options
      startWith(''),
      map((value) => this._filter1(value || ''))
    );
  }

  private _filter(value: string): any {
    //filter base on what we searching
    const filterValue = value.toLowerCase();
    return this.modelNames.filter((option) => option.includes(filterValue));
  }

  private _filter1(value: string): any {
    //filter base on what we searching
    const filterValue = value.toLowerCase();
    return this.segmentOptions.filter((option) => option.includes(filterValue));
  }

  getSegment(control: FormControl) {
    //get segment by id
    if (control.value === '') {
      this.toastr.error();
      return;
    }
    //if we choose segment display it to form
    const ediSegment = this.store
      .selectSnapshot((state) => state.edi.ediSegments)
      .find((segment: any) => segment.title === control.value);
    if (ediSegment) {
      this.updateForm.patchValue({
        title: ediSegment.title,
        description: ediSegment.description,
      });
    }

    //find model name of spesific segment
    const modelName = this.store
      .selectSnapshot((state) => state.edi.ediModels)
      .find((model: any) => model.id === ediSegment.model_Id).title;
    this.modelControl.patchValue(modelName); //patch value to update form
    this.showForm = true; //show form
  }

  updateSegment(control: FormControl) {
    try {
      this.loading = true; //set loading to true
      if (this.updateForm.invalid || control.value === '') {
        this.toastr.error();
        this.loading = false;
        return;
      }
      //find id of spesific edi segment
      const id = this.store
        .selectSnapshot((state) => state.edi.ediSegments)
        .find((segment: any) => segment.title === this.segmentControl.value).id;
      //model_id of spesific edi segment
      const model_Id = this.store
        .selectSnapshot((state) => state.edi.ediModels)
        .find((model: any) => model.title === control.value).id;
      const ediSegment: EdiSegment = {
        title: this.updateForm.value.title || '',
        description: this.updateForm.value.description || '',
        id: id,
        model_Id: model_Id,
      };

      this.subscription = this.store
        .dispatch(new UpdateEdiSegment({ ediSegment: ediSegment }))
        .subscribe({
          next: (response) => {
            console.log('updated');
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
            this.toastr.success('Edi Segment updated successfully');
            this.updateForm.reset();
            this.modelControl.patchValue('');
            this.segmentControl.patchValue('');
            this.refreshData();
          },
        });
    } catch (err) {
      console.log(err);
      this.loading = false;
    }
    //dispatch action to update edi segment
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
