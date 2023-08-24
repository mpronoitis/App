import { Component, OnInit } from '@angular/core';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { loginUser } from '@play.app/types/Auth/loginUser';
import { Login } from '../../@store/Actions/auth.actions';
import { BadRequestResponse } from '@play.app/types/Response/BadRequestResponse';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminForgotPasswordDialogComponent } from '../../@dialogs/Auth/forgot-password-dialog/forgot-password-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'play-admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  faSignIn = faSignIn;
  loading = false;
  dialogRef: MatDialogRef<AdminForgotPasswordDialogComponent> | undefined;
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  show_message = false;
  message_text = '';

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private store: Store,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    //if we have token then redirect to dashboard
    this.store
      .select((state) => state.auth.token)
      .subscribe((token) => {
        if (token) {
          //redirect user to {base url}/user/profile
          this.router.navigate(['/dashboard']).then((r) => r);
        }
      });
  }

  forgotPasswordDialog() {
    this.dialogRef = this.dialog.open(AdminForgotPasswordDialogComponent, {
      width: '500px',
      height: '500px',
    });
    this.dialogRef
      .afterClosed()
      .pipe(finalize(() => console.log('completed')))
      .subscribe((data) => {
        console.log(data);
      });
    //close dialog ;
  }

  login() {
    try {
      this.loading = true; //show to guest that we are processing their request
      if (this.form.invalid) {
        //if wrong credentials show message
        this.show_message = true;
        this.message_text = 'Invalid input';
        return;
      }

      //if all is ok then send request to server
      const loginUser: loginUser = {
        email: this.form.value.email || '',
        password: this.form.value.password || '',
      };

      this.store.dispatch(new Login(loginUser)).subscribe({
        next: () => {
          this.loading = false;

          this.router.navigate(['/dashboard']).then(() => {
            return;
          });
        },
        complete: () => {
          const token = this.store.selectSnapshot((state) => state.auth.token);
          if (token === null) {
            this.toastr.error();
          }
        },
        error: (error) => {
          this.loading = false;
          if (error.status === 400) {
            const badRequestResponse: BadRequestResponse = error.error;
            this.show_message = true;
            this.message_text = badRequestResponse.errors.Messages[0];
            //clear password field
            this.form.controls.password.setValue('');
          } else if (error.status === 429) {
            this.show_message = true;
            this.message_text = 'Too many requests';
          } else {
            throw error;
          }
        },
      });
    } catch (err) {
      this.message_text = 'Something went wrong';
      this.show_message = true;
      this.loading = false;
      console.log(err);
    }
  }
}
