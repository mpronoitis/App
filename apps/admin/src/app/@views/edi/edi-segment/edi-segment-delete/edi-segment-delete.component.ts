import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import { DeleteEdiSegment } from 'apps/admin/src/app/@store/Actions/edi.actions';
import { BadRequestResponse } from '@play.app/types/Response/BadRequestResponse';
@Component({
  selector: 'play-app-admin-edi-segment-delete',
  templateUrl: './edi-segment-delete.component.html',
  styleUrls: ['./edi-segment-delete.component.scss'],
})
export class EdiSegmentDeleteComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined; //to destroy subscription after request
  faTrash = faTrash;
  loading = false;
  segmentControl = new FormControl('');
  ediSegmentFilteredOptions: Observable<string[]> | undefined;
  @Input() segmentOptions: string[] = [];
  @Output() refresh = new EventEmitter<void>(); //emit when we press refresh button
  constructor(private store: Store, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.ediSegmentFilteredOptions = this.segmentControl.valueChanges.pipe(
      //filtering to options base what we are typing
      //every type we typing checking for possible options
      startWith(''),
      map((value) => this._segmentFilter(value || ''))
    );
  }

  private _segmentFilter(value: string): any {
    //filter base on what we searching
    const filterValue = value.toLowerCase();
    return this.segmentOptions.filter((option) => option.includes(filterValue));
  }

  refreshData() {
    this.refresh.emit();
  }

  deleteSegment(control: FormControl) {
    try {
      this.loading = true;
      if (control.value === '') {
        this.toastr.error();
        this.loading = false;
        return;
      }

      //find id of segment to delete
      const id = this.store
        .selectSnapshot((state) => state.edi.ediSegments)
        .find((segment: any) => segment.title === control.value).id;

      this.store.dispatch(new DeleteEdiSegment({ id: id })).subscribe({
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
          this.toastr.success('Edi Segment deleted successfully');
          this.segmentControl.patchValue('');
          this.refreshData(); //fetch segments
        },
      });
    } catch (err) {
      console.log(err);
      this.loading = false;
    }
  }

  ngOnDestroy(): void {
    //destroy subscription
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
