import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AuthService } from '@play.app/services/Auth/auth.service';
import { RegisterUser } from '@play.app/types/Auth/RegisterUser';
import { BadRequestResponse } from '@play.app/types/Response/BadRequestResponse';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'play-app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  /**
   * @todo , on password confirm change, if passwords don't match add invalid class to give red glow
   */
  register_image = '';
  loading = false;
  show_message = false;
  message_text = '';
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private authService: AuthService,
    private store: Store,
    private toastr: ToastrService
  ) {
    this.register_image = this.chooseLoginImage();
  }

  /**
   * @description function to choose a random login image
   * @returns {string} - the random login image
   */
  chooseLoginImage(): string {
    //get a random number between 1 and 16
    const randomNumber = Math.floor(Math.random() * 16) + 1;
    //set the image path
    return `assets/Images/Login/login-${randomNumber}.webp`;
  }

  /**
   * @description function to register the user
   * @returns {void}
   */
  register(): void {
    this.loading = true;
    try {
      //if form is invalid show message
      if (this.form.invalid) {
        this.show_message = true;
        this.message_text = 'Invalid input';
        return;
      }
      //if passwords don't match show message
      if (this.form.value.password !== this.form.value.confirmPassword) {
        this.show_message = true;
        this.message_text = "Passwords don't match";
        return;
      }
      //if none of the form values are null map to RegisterUser object
      const registerUser: RegisterUser = {
        email: this.form.value.email || '',
        password: this.form.value.password || '',
        confirmPassword: this.form.value.confirmPassword || '',
      };
      //register the user
      this.authService.registerUser(registerUser).subscribe({
        next: (response) => {
          //save token to local storage
          localStorage.setItem('access_token', response.token);
          //REGISTRATION SUCCESSFUL!
        },
        error: (error) => {
          //if response code is 400 (bad request)
          if (error.status === 400) {
            const badRequestResponse: BadRequestResponse = error.error;
            //show message
            this.show_message = true;
            this.message_text = badRequestResponse.errors.Messages[0];
          } else {
            throw error;
          }
        },
      });
    } catch (err) {
      this.toastr.error();
    } finally {
      //set loading to false after 700 ms
      setTimeout(() => {
        this.loading = false;
      }, 700);
    }
  }
}
