import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { BadRequestResponse } from '@play.app/types/Response/BadRequestResponse';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ForgotPassword } from '../../../@store/Actions/auth.actions';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EdiDocument } from '@play.app/types/Edi/EdiDocument';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'play-app-forgot-password-dialog',
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
        <div class="mb-6 text-center">
          <play-components-simple-alert
            *ngIf="show_message"
            type="danger"
            [text]="message_text"
            title="Error!"
          >
          </play-components-simple-alert>
          <play-components-simple-alert
            *ngIf="show_success"
            type="success"
            [text]="message_text"
            title="Info!"
          >
          </play-components-simple-alert>
          <button
            (click)="changePassword()"
            [disabled]="form.invalid"
            action="submit"
            class="w-full mt-4 text-sm font-bold bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            <fa-icon [icon]="faKey"></fa-icon> Reset Password
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [``],
})
export class ForgotPasswordDialogComponent {
  sub: Subscription | undefined;
  // eslint-disable-next-line @typescript-eslint/no-empty-function

  show_message = false;
  show_success = false;
  message_text = '';
  email = '';
  loading = false;
  faKey = faKey;
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private toastr: ToastrService
  ) {}

  changePassword(): void {
    //check if captcha is valid
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
          this.show_success = true;
          this.message_text =
            'Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.';
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
}

// ngOnDestroy(): void {
//   this.sub?.unsubscribe();
// }
