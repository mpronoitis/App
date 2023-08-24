import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngxs/store';
import { RegisterUser } from '@play.app/types/Auth/RegisterUser';
import { BadRequestResponse } from '@play.app/types/Response/BadRequestResponse';
import { ToastrService } from 'ngx-toastr';
import { CreateUser } from '../../../@store/Actions/users.action';

@Component({
  selector: 'play-app-admin-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
})
export class UserAddComponent {
  faAdd = faAdd;
  loading = false;
  @Output() refresh = new EventEmitter<void>(); //emit when we press refresh button
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private toastr: ToastrService, private store: Store) {}

  addForm = new FormGroup({
    //FormGroup for register user
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

  //create user
  createUser() {
    this.loading = true;
    try {
      //if form is invalid show message
      if (this.addForm.invalid) {
        this.toastr.error();
        this.loading = false;
        return;
      }
      //if passwords don't match show message
      if (this.addForm.value.password !== this.addForm.value.confirmPassword) {
        this.toastr.error();
        this.loading = false;
        return;
      }
      //if none of the form values are null map to RegisterUser object
      const registerUser: RegisterUser = {
        email: this.addForm.value.email || '',
        password: this.addForm.value.password || '',
        confirmPassword: this.addForm.value.confirmPassword || '',
      };
      //register the user

      this.store.dispatch(new CreateUser(registerUser)).subscribe({
        next: (response) => {
          console.log(response);
        },
        complete: () => {
          this.toastr.success('User created successfully');
          this.loading = false;
          this.refreshData(); //refresh all users
          this.addForm.reset(); //reset form
        },
        error: (error) => {
          //if response code is 400 (bad request)
          if (error.status === 400) {
            const badRequestResponse: BadRequestResponse = error.error;
            //show message
            this.toastr.error();
          } else {
            throw error;
          }
        },
      });
    } catch (error) {
      console.log(error);
      console.log('error');
    }
  }

  refreshData() {
    this.refresh.emit();
  }
}
