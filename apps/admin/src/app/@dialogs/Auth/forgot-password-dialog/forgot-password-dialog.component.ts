import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { faKey, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ForgotPassword } from '../../../@store/Actions/auth.actions';
import { ToastrService } from 'ngx-toastr';
import { BadRequestResponse } from '@play.app/types/Response/BadRequestResponse';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'play-app-admin-forgot-password-dialog',
  template: `
    <div class="container mx-auto">
      <div class="px-8 mb-4 text-center">
        <h2 class="pt-4 mb-2 text-2xl">Forgot Your Password?</h2>
        <p class="mb-4 text-sm text-gray-700">
          We get it, stuff happens. Just enter your email address below and
          we'll send you a link to reset your password!
        </p>
      </div>

      <form [formGroup]="form" class="px-8 pt-8 pb-8 mb-4 bg-white rounded">
        <div class="mb-4">
          <label class="block mb-2 text-sm font-bold text-gray-700" for="email">
            Email
          </label>
          <input
            class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="email"
            formControlName="email"
            type="email"
            required
            placeholder="Enter Email Address..."
          />
        </div>
        <div class="flex flex-col justify-between">
          <!-- <play-components-simple-alert
            *ngIf="show_message"
            type="danger"
            [text]="message_text"
            title="Error!"
          >
          </play-components-simple-alert> -->

          <div class="mt-4">
            <button
              class="w-full px-4 py-2 mt-4 font-bold text-white bg-red-500 rounded-md hover:bg-red-700 focus:outline-none focus:shadow-outline"
              type="button"
              [disabled]="form.invalid"
              (click)="changePassword()"
            >
              <fa-icon [icon]="faKey"></fa-icon> Send Email
            </button>

            <button
              class="w-full px-4 py-2 mt-4 font-bold text-white bg-orange-500 rounded-md hover:bg-orange-700 focus:outline-none focus:shadow-outline"
              type="button"
              (click)="close()"
            >
              <fa-icon [icon]="faXmark"></fa-icon> Cancel
            </button>
          </div>
        </div>
        <hr class="mt-5 border-t" />
      </form>
    </div>
  `,
  styles: [``],
})
export class AdminForgotPasswordDialogComponent {
  show_message = false; //show message when form is invalid
  faXmark = faXmark;
  message_text = ''; //body of message
  email = ''; //email that user types to form
  loading = false; //loading to wait endpoint make the process
  faKey = faKey;
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private store: Store,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<AdminForgotPasswordDialogComponent>
  ) {}

  changePassword() {
    try {
      this.loading = true;
      if (this.form.invalid) {
        this.show_message = true;
        this.message_text = 'Invalid input';
        return;
      }

      this.email = this.form.value.email || '';
      this.store.dispatch(new ForgotPassword({ email: this.email })).subscribe({
        next: () => {
          this.loading = false;
          this.toastr.success(
            'Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.'
          );
        },
        error: (e) => {
          if (e.status === 400) {
            const badRequestResponse: BadRequestResponse = e.error;
            this.show_message = true;
            this.message_text = badRequestResponse.errors.Messages[0];
          } else if (e.status === 429) {
            //if response code is 429 show message regarding too many requests
            this.show_message = true;
            this.message_text =
              "Slow down there, you're making too many requests";
          } else {
            //throw
            throw e;
          }
        },
      });
    } catch (err) {
      this.message_text = 'Something went wrong';
      this.show_message = true;
      console.log(err);
    } finally {
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    }
  }

  close(): void {
    this.dialogRef.close(true);
  }
}
