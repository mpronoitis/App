import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '@play.app/types/User/User';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { DeleteUser } from '../../../@store/Actions/users.action';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { BadRequestResponse } from '@play.app/types/Response/BadRequestResponse';

@Component({
  selector: 'play-app-information-user-dialog',
  template: `
    <h1 mat-dialog-title>User Information</h1>
    <div mat-dialog-content>
      <form class="w-full md:pl-5 pt-3 max-w-lg">
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="inline-full-name"
            >
              ID
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              readonly
              disabled
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="inline-full-name"
              type="text"
              [value]="data.id"
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="inline-full-name"
            >
              Email
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              readonly
              disabled
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="inline-full-name"
              type="text"
              [value]="data.email"
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="inline-full-name"
            >
              Username
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              readonly
              disabled
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="inline-full-name"
              type="text"
              [value]="data.username"
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="inline-full-name"
            >
              Role
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              readonly
              disabled
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="inline-full-name"
              type="text"
              [value]="data.role"
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="inline-full-name"
            >
              LoginAtempts
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              readonly
              disabled
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="inline-full-name"
              type="text"
              [value]="data.loginAttempts"
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="inline-full-name"
            >
              FailedLoginAtempts
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              readonly
              disabled
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="inline-full-name"
              type="text"
              [value]="data.failedLoginAttempts"
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="inline-full-name"
            >
              LastLogin
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              readonly
              disabled
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="inline-full-name"
              type="text"
              [value]="data.lastLogin | date: 'short'"
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="inline-full-name"
            >
              CreatedAt
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              readonly
              disabled
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="inline-full-name"
              type="text"
              [value]="data.createdAt | date: 'dd/MM/yyyy HH:mm:ss'"
            />
          </div>
        </div>
      </form>
    </div>
    <mat-dialog-actions align="end">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mr-2 focus:outline-none focus:shadow-outline"
        (click)="dialogRef.close()"
      >
        <fa-icon [icon]="faTimes"></fa-icon>
        Close
      </button>
      <button
        (click)="deleteUser()"
        [disabled]="loading"
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
      >
        <fa-icon [icon]="faTrash"></fa-icon>
        Delete
      </button>
    </mat-dialog-actions>
  `,
  styles: [``],
})
export class InformationUserDialogComponent {
  faTimes = faTimes;
  faTrash = faTrash;
  loading = false;
  @Output() submitClicked = new EventEmitter<boolean>(); //when we delete user emit event to parent component to refresh table
  constructor(
    public dialogRef: MatDialogRef<InformationUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private store: Store,
    private toastr: ToastrService
  ) {}

  deleteUser() {
    try {
      this.loading = true;
      this.store.dispatch(new DeleteUser(this.data.id)).subscribe({
        next: () => {
          this.loading = false;
          this.toastr.success('User deleted successfully');
          //emit event to parent component
          this.submitClicked.emit(true);
          this.dialogRef.close(true);
        },
        error: (error) => {
          if (error.status === 400) {
            const bad_request: BadRequestResponse = error.error;
            this.toastr.error();
          }
        },
      }); // dispatch action with id of displayed user
    } catch (e) {
      console.log(e);
    }
  }
}
