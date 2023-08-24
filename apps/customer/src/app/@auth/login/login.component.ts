import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { loginUser } from '@play.app/types/Auth/loginUser';
import { Store } from '@ngxs/store';
import { Login } from '../../@store/Actions/auth.actions';
import { Router } from '@angular/router';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ForgotPasswordDialogComponent } from '../../@dialogs/auth/forgot-password-dialog/forgot-password-dialog.component';
import { TrialDialogComponent } from '../../@dialogs/trial/trial-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'play-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  login_image: string;
  loading = false;
  faSignIn = faSignIn;
  dialog_subscription: Subscription | undefined;
  capsOn = false;
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    public store: Store,
    private router: Router,
    private dialog: MatDialog,
    public toastr: ToastrService
  ) {
    this.login_image = this.chooseLoginImage();
  }

  ngOnInit(): void {
    //this.recaptchaService.execute();
    this.store
      .select((state) => state.auth.token)
      .subscribe((token) => {
        if (token) {
          //redirect user to {base url}/user/profile
          this.router.navigate(['/user']).then(() => {
            return;
          });
        }
      });
  }

  /**
   * @description function to choose a random login image
   * @returns {string} - the random login image
   */
  forgotPasswordDialog() {
    this.dialog.open(ForgotPasswordDialogComponent, {
      width: '400px',
    });
  }

  /**
   * @description function to open the trial dialog
   */
  showTrialDialog() {
    this.dialog.open(TrialDialogComponent, {
      width: '500px',
    });
  }

  chooseLoginImage(): string {
    //get a random number between 1 and 16
    const randomNumber = Math.floor(Math.random() * 16) + 1;
    //set the image path
    return `assets/Images/Login/login-${randomNumber}.webp`;
  }

  /**
   * @description function to login the user
   */
  login() {
    try {
      this.loading = true;
      //if form is invalid show message
      if (this.form.invalid) {
        this.toastr.error();
        return;
      }
      //build the login user object
      const loginUser: loginUser = {
        email: this.form.value.email || '',
        password: this.form.value.password || '',
      };

      this.store.dispatch(new Login(loginUser)).subscribe({
        next: () => {
          this.router.navigate(['user/dashboard']).then(() => {
            return;
          });
        },
        error: (e) => {
          //if response code is 400 transform to BadRequestResponse
          if (e.status === 400) {
            //show toast message
            this.toastr.error(
              'Verify your credentials',
              'Something went wrong',
              {
                timeOut: 3000,
              }
            );
            this.loading = false;
            //clear password field
            this.form.controls.password.setValue('');
          } else {
            throw e;
          }
        },
        complete: () => {
          this.loading = false;
        },
      });
    } catch (err) {
      console.log(err);
      this.loading = false;
    }
  }

  ngOnDestroy(): void {
    if (this.dialog_subscription) {
      this.dialog_subscription.unsubscribe();
    }
  }
}
