import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngxs/store';
import { BadRequestResponse } from '@play.app/types/Response/BadRequestResponse';
import { User } from '@play.app/types/User/User';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, startWith } from 'rxjs';
import { DeleteUser } from '../../../@store/Actions/users.action';
@Component({
  selector: 'play-app-admin-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss'],
})
export class UserDeleteComponent implements OnInit {
  faTrash = faTrash;
  myControl = new FormControl(''); //formcontrol for email of user at autocomplete
  filteredOptions: Observable<string[]> | undefined;
  loading = false;

  @Input() options: string[] = [];
  @Input() users!: User[] | undefined;
  @Output() refresh = new EventEmitter<void>(); //emit when we press refresh button
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private store: Store, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      //every type we typing checking for possible options
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): any {
    //filter base on what we searching
    const filterValue = value.toLowerCase();
    return this.options.filter((option) => option.includes(filterValue));
  }

  deleteUser(controll: FormControl) {
    this.loading = true;
    if (controll.value === '') {
      this.toastr.error();
      this.loading = false;
      return;
    }
    this.users?.filter((user) => {
      //filter allUsers to take id of current user
      if (user.email === controll.value) {
        this.store.dispatch(new DeleteUser(user.id)).subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (e) => {
            //if response is 400 map to bad request
            if (e.status === 400) {
              const bad_request: BadRequestResponse = e.error;
              this.toastr.error();
            }
          },
          complete: () => {
            this.toastr.success('User deleted successfully');
            this.loading = false;
            this.refresh.emit(); //emit refresh event
            this.myControl.patchValue('');
          },
        });
      }
    });
  }
}
