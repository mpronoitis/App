import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { UserProfile } from '@play.app/types/Profile/UserProfile';
import { BadRequestResponse } from '@play.app/types/Response/BadRequestResponse';
import {
  GetUserProfile,
  UpdateUserProfile,
} from 'apps/customer/src/app/@store/Actions/user.action';
import { ToastrService } from 'ngx-toastr';
import { GetEdiCredit } from '../../../../@store/Actions/edi.actions';
import { EdiCredit } from '@play.app/types/Edi/EdiCredit';
import { GetEdiCredits } from '../../../../../../../admin/src/app/@store/Actions/edi.actions';

@Component({
  selector: 'play-app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  edit = false;
  loading = false;
  //flag for error message
  show_message = false;
  message_text = '';
  ediCredit: EdiCredit | undefined;

  userProfile: UserProfile | undefined;
  email = localStorage.getItem('auth.email') || '';
  form = new FormGroup({
    firstName: new FormControl({ value: '', disabled: !this.edit }, [
      Validators.required,
    ]),
    lastName: new FormControl({ value: '', disabled: !this.edit }, [
      Validators.required,
    ]),
    companyName: new FormControl({ value: '', disabled: !this.edit }, [
      Validators.required,
    ]),
    //date of birth is of type date and disabled based on edit state
    dateOfBirth: new FormControl<Date>(
      { value: new Date(), disabled: !this.edit },
      [Validators.required]
    ),

    afm: new FormControl({ value: '', disabled: true }),
  });

  constructor(private store: Store, private toastr: ToastrService) {}

  ngOnInit(): void {
    //get all promises that need to be resolved
    const promises = [this.getEdiCredit(), this.getCustomerProfile()];
    //loading flag
    this.loading = true;
    //resolve all promises and after that set the loading flag to false
    Promise.all(promises).then(
      () => {
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.toastr.error('Something went wrong');
      }
    );
  }

  getCustomerProfile(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      //get user id from auth state
      this.store
        .select((state) => state.auth.id)
        .subscribe((id: any) => {
          //get user profile
          this.store.dispatch(new GetUserProfile(id)).subscribe({
            next: (v) => {
              this.userProfile = v.user.userProfile;
              resolve(true);
              //set form values
              if (this.userProfile) {
                this.form.patchValue({
                  firstName: this.userProfile.firstName,
                  lastName: this.userProfile.lastName,
                  companyName: this.userProfile.companyName,
                  afm: this.userProfile.tin,
                  dateOfBirth: this.userProfile.dateOfBirth,
                });
              }
            },
            error: (e) => {
              console.log(e);
              reject(false);
            },
          });
        });
    });
  }

  getEdiCredit() {
    return new Promise((resolve, reject) => {
      //get user id from auth state
      this.store
        .select((state) => state.auth.id)
        .subscribe((id: any) => {
          //get user profile
          this.store.dispatch(new GetEdiCredit({ customerId: id })).subscribe({
            next: (v: any) => {
              this.ediCredit = v.edi.ediCredit;
              resolve(true);
            },
            error: (e) => {
              console.log(e);
              reject(false);
            },
          });
        });
    });
  }

  onEdit() {
    this.edit = !this.edit;
    if (this.edit) {
      this.form.enable();
    } else {
      this.form.disable();
    }
    this.show_message = false;
  }

  onSubmit() {
    //if form is invalid show error message with details
    if (this.form.invalid) {
      this.show_message = true;
      this.message_text = 'Please fill all the fields';
      return;
    }
    if (this.form.valid) {
      try {
        this.loading = true;
        //create new instance of UserProfile, make sure every property is set
        const userProfile = {
          id: this.userProfile?.id || '',
          user_Id: this.userProfile?.user_Id || '',
          firstName: this.form.get('firstName')?.value || '',
          lastName: this.form.get('lastName')?.value || '',
          companyName: this.form.get('companyName')?.value || '',
          dateOfBirth: this.form.get('dateOfBirth')?.value || new Date(),
          languagePreference: this.userProfile?.languagePreference || '',
          themePreference: this.userProfile?.themePreference || 'light',
          tin: this.userProfile?.tin || '000000000',
        };
        const sub = this.store
          .dispatch(new UpdateUserProfile(userProfile))
          .subscribe({
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            next: () => {
              this.toastr.success(
                'Your profile was updated successfully!',
                'Success!'
              );
            },
            error: (e) => {
              //if response is 400 map to bad request
              if (e.status === 400) {
                const bad_request: BadRequestResponse = e.error;
                this.message_text = bad_request.title;
                this.show_message = true;
              } else {
                this.show_message = true;
                this.message_text = e.error.message;
              }
            },
            complete: () => {
              this.show_message = false;
              this.onEdit();
              sub.unsubscribe();
            },
          });
      } catch (e: unknown) {
        //catch any error and show error message
        this.show_message = true;
        this.message_text = 'Something went wrong';
      } finally {
        this.loading = false;
      }
    }
  }
}
