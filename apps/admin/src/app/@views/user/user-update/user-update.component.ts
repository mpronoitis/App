import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { BadRequestResponse } from '@play.app/types/Response/BadRequestResponse';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { User } from '@play.app/types/User/User';
import {
  GetUserProfile,
  UpdatePasswordUser,
  UpdateRoleUser,
  UpdateUserProfile,
} from '../../../@store/Actions/users.action';
import { UserProfile } from '@play.app/types/Profile/UserProfile';

@Component({
  selector: 'play-app-admin-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
})
export class UserUpdateComponent implements OnInit {
  myControl = new FormControl(''); //formcontrol for email of user at autocomplete
  updateRoleUserControl = new FormControl('');
  filteredOptions: Observable<string[]> | undefined;
  updateRoleUserFilteredOptions: Observable<string[]> | undefined;
  loading = false;
  faSync = faSync;
  showForm = false;
  loadingUpdatePassword = false;
  loadingUpdateRole = false;
  roleUser = '';
  roleUserControl = new FormControl('');
  roleUserOptions: string[] = ['PlayAdmin', 'Customer', 'PlayBot'];
  roleUserFilteredOptions: Observable<string[]> | undefined;
  updateProfile: UserProfile | undefined; //current update profile
  //update User Form
  updateForm = new FormGroup({
    //FormGroup for update user
    firstName: new FormControl({ value: '', disabled: false }, [
      Validators.required,
    ]),
    lastName: new FormControl({ value: '', disabled: false }, [
      Validators.required,
    ]),
    companyName: new FormControl({ value: '', disabled: false }, [
      Validators.required,
    ]),
    //date of birth is of type date and disabled based on edit state
    dateOfBirth: new FormControl<Date>({ value: new Date(), disabled: false }, [
      Validators.required,
    ]),

    afm: new FormControl({ value: '', disabled: false }, [Validators.required]),
  });
  //form to update password of a user
  updatePasswordForm = new FormGroup({
    //FormGroup for update user
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  updateRoleForm = new FormGroup({
    //FormGroup for update user
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  @Input() options: string[] = []; //pass from parent component (All users of database)
  @Input() users!: User[] | undefined;
  @Output() refresh = new EventEmitter<void>(); //emit when we press refresh button
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private store: Store, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      //every type we're typing checking for possible options
      startWith(''),
      map((value) => this._filter(value || ''))
    );

    this.roleUserFilteredOptions = this.roleUserControl.valueChanges.pipe(
      //every type we're typing checking for possible options
      startWith(''),
      map((value) => this._filterRoleUser(value || ''))
    );

    this.updateRoleUserFilteredOptions =
      this.updateRoleUserControl.valueChanges.pipe(
        //every type we're typing checking for possible options
        startWith(''),
        map((value) => this._filterRoleUser(value || ''))
      );
  }
  private _filter(value: string): any {
    //filter base on what we're searching
    const filterValue = value.toLowerCase();
    return this.options.filter((option) => option.includes(filterValue));
  }

  private _filterRoleUser(value: string): any {
    const filterValue = value.toLowerCase();
    return this.roleUserOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  //getUser base on email
  getCurrentUser(control: FormControl) {
    this.loading = true;
    if (control.value === '') {
      this.toastr.error();
      this.loading = false;
      return;
    }

    this.roleUser = this.store
      .selectSnapshot((state) => state.users.users)
      .find(
        //role of cuurent user
        (user: any) => user.email === control.value
      ).role;
    //get user base on what we will search
    this.users?.filter((user) => {
      //filter allUsers to take id of current user
      if (user.email === control.value) {
        this.store.dispatch(new GetUserProfile(user.id)).subscribe({
          next: (response) => {
            this.updateForm.patchValue({
              firstName: response.users.userProfile.firstName,
              lastName: response.users.userProfile.lastName,
              companyName: response.users.userProfile.companyName,
              dateOfBirth: response.users.userProfile.dateOfBirth,
              afm: response.users.userProfile.tin,
            });

            this.updateProfile = response.users.userProfile; //save profile to update
            this.roleUserControl.patchValue(this.roleUser); //set role of user
            //set role of user to update role form
            this.updateRoleForm.patchValue({
              email: control.value,
            });
            //set email of user to update password form
            this.updatePasswordForm.patchValue({
              email: control.value,
            });
          },
          error: (e) => {
            //if response is 400 map to bad request
            if (e.status === 400) {
              const bad_request: BadRequestResponse = e.error;
              this.toastr.error();
            } else {
              this.toastr.error('Error fetching user');
            }
          },
          complete: () => {
            this.toastr.success('Fetch User', 'Successfully fetching user');
            this.loading = false;
            this.showForm = true;
          },
        });
      }
    });
  }

  updatePassword(control: FormControl) {
    this.loadingUpdatePassword = true;
    this.users?.filter((user: any) => {
      //filter allUsers to take id of current user

      if (this.updatePasswordForm.invalid) {
        //if form invalid show error message
        this.toastr.error();
        this.loadingUpdatePassword = false;
        return;
      }

      if (control.value === '') {
        this.toastr.error();
        this.loadingUpdatePassword = false;
        return;
      }

      if (this.updatePasswordForm.valid) {
        if (user.email === control.value) {
          //take the email we want to change
          try {
            this.store
              .dispatch(
                new UpdatePasswordUser({
                  userId: user.id,
                  email: this.updatePasswordForm.get('email')?.value || '',
                  password:
                    this.updatePasswordForm.get('password')?.value || '',
                })
              )
              .subscribe({
                next: (v) => {
                  console.log(v);
                },
                error: (e) => {
                  //if response is 400 map to bad request
                  if (e.status === 400) {
                    const bad_request: BadRequestResponse = e.error;
                    this.toastr.error();
                    this.loadingUpdatePassword = false;
                  }
                },
                complete: () => {
                  this.loadingUpdatePassword = false;
                  this.toastr.success('Password updated successfully');
                  this.updateForm.reset();
                  this.updatePasswordForm.reset();
                  this.myControl.patchValue('');
                  this.refreshData();
                  // location.reload();
                },
              });
          } catch (e: any) {
            //catch any error and show error message
            console.log(e);
            this.toastr.error('Error');
          }
        }
      }
    });
  }

  updateUser(controll: FormControl, roleUserControl: FormControl) {
    this.loading = true; //show loading

    this.users?.filter((user) => {
      //filter allUsers to take id of current user

      if (this.updateForm.invalid) {
        this.toastr.error();
        this.loading = false; //hide loading there is a error in form
        return;
      }

      if (controll.value === '') {
        this.toastr.error();
        this.loading = false; //hide loading there is a error in form
        return;
      }
      if (roleUserControl.value === '') {
        this.toastr.error();
        this.loading = false; //hide loading there is a error in form
        return;
      }

      if (this.updateForm.valid) {
        //if form is valid
        if (user.email === controll.value) {
          //find id of user base on email
          try {
            //create new instance of UserProfile, make sure every property is set
            const userProfile = {
              id: this.updateProfile?.id || '',
              user_Id: user.id, // filter allUsers to take id of current user we want to change
              firstName: this.updateForm.get('firstName')?.value || '',
              lastName: this.updateForm.get('lastName')?.value || '.',
              companyName: this.updateForm.get('companyName')?.value || '',
              dateOfBirth:
                this.updateForm.get('dateOfBirth')?.value || new Date(),
              languagePreference: this.updateProfile?.languagePreference || '',
              themePreference: this.updateProfile?.themePreference || 'light',
              tin: this.updateForm.get('afm')?.value || '000000000',
            };

            this.store.dispatch(new UpdateUserProfile(userProfile)).subscribe({
              next: (v) => {
                console.log(v);
              },
              error: (e) => {
                //if response is 400 map to bad request
                if (e.status === 400) {
                  const bad_request: BadRequestResponse = e.error;
                  this.toastr.error();
                }
              },
              complete: () => {
                this.toastr.success('User updated successfully');
                this.loading = false;
                this.updateForm.reset();
                this.updatePasswordForm.reset();
                this.myControl.patchValue('');
                this.refreshData();
                // location.reload();
              },
            });
          } catch (e: any) {
            //catch any error and show error message
            console.log(e);
            this.toastr.error('Error');
          }
        }
      }
    });
  }

  updateRole(updateRoleUserControl: FormControl, emailControl: FormControl) {
    try {
      this.loadingUpdateRole = true;
      if (updateRoleUserControl.value === '') {
        this.toastr.error();
        this.loadingUpdateRole = false;
        return;
      }
      if (this.updateRoleForm.invalid) {
        this.toastr.error();
        this.loadingUpdateRole = false;
        return;
      }

      if (emailControl.value === '') {
        this.toastr.error();
        this.loadingUpdateRole = false;
        return;
      }

      if (this.updateRoleForm.get('email')?.value === emailControl.value) {
        if (
          this.updateRoleForm.valid &&
          updateRoleUserControl.value !== this.roleUser
        ) {
          this.store
            .dispatch(
              new UpdateRoleUser({
                userId: this.updateProfile?.user_Id || '',
                email: this.updateRoleForm.get('email')?.value || '',
                role: updateRoleUserControl.value,
              })
            )
            .subscribe({
              next: (v) => {
                console.log(v);
              },
              error: (e) => {
                //if response is 400 map to bad request
                if (e.status === 400) {
                  const bad_request: BadRequestResponse = e.error;
                  this.toastr.error();
                }
              },
              complete: () => {
                this.toastr.success('User role updated successfully');
                this.loadingUpdateRole = false;
                this.updateRoleForm.reset();
                this.updateForm.reset();
                this.myControl.patchValue('');
                this.updateRoleUserControl.patchValue('');
                this.refreshData();
              },
            });
        } else {
          this.toastr.info('Custommer role is same as before');
          this.loadingUpdateRole = false;
        }
      } else {
        this.toastr.error();
        this.loadingUpdateRole = false;
      }
    } catch (e: any) {
      //catch any error and show error message
      console.log(e);
      this.toastr.error('Error');
    }
  }

  refreshData() {
    this.refresh.emit();
  }
}
