import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngxs/store';
import { BadRequestResponse } from '@play.app/types/Response/BadRequestResponse';
import { DeleteEdiConnection } from 'apps/admin/src/app/@store/Actions/edi.actions';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'play-app-admin-edi-connection-delete',
  templateUrl: './edi-connection-delete.component.html',
  styleUrls: ['./edi-connection-delete.component.scss'],
})
export class EdiConnectionDeleteComponent implements OnInit, OnDestroy {
  ediConnectionControl = new FormControl('');
  ediConnectionsFilteredOptions: Observable<string[]> | undefined;
  loading = false;
  subscription: Subscription | undefined; //to destroy subscription after request
  faTrash = faTrash;
  @Input() ediConnectionsOptions: string[] = [];
  @Output() refresh = new EventEmitter<void>(); //emit when we press refresh button

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private store: Store, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.ediConnectionsFilteredOptions =
      this.ediConnectionControl.valueChanges.pipe(
        //filtering to options base what we are typing
        //every type we typing checking for possible options
        startWith(''),
        map((value) => this.ediConnectionFilter(value || ''))
      );
  }

  private ediConnectionFilter(value: string): any {
    //filter base on what we searching
    const filterValue = value.toLowerCase();
    return this.ediConnectionsOptions.filter((option) =>
      option.includes(filterValue)
    );
  }

  deleteConnection(ediConnectionControl: FormControl) {
    try {
      this.loading = true;
      if (ediConnectionControl.value === '') {
        this.toastr.error();
        this.loading = false;
        return;
      }
      //if all ok  find id of edi conneciton

      const id = this.store //find id of edi conenction(we display base of ftp_Username)
        .selectSnapshot((state) => state.edi.ediConnections)
        .find(
          (connection: any) =>
            connection.ftp_Username === ediConnectionControl.value
        ).id;
      this.subscription = this.store //displatch delete action
        .dispatch(new DeleteEdiConnection({ id: id }))
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
              throw err;
            }
          },
          complete: () => {
            this.loading = false;
            this.toastr.success('Edi Connection deleted successfully');
            this.ediConnectionControl.patchValue('');
            this.refreshData(); //fetch new changes
          },
        });
    } catch (error) {
      console.log(error);
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
