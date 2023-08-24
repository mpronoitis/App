import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Store } from '@ngxs/store';

import { UserProfile } from '@play.app/types/Profile/UserProfile';
import { BadRequestResponse } from '@play.app/types/Response/BadRequestResponse';
import {
  faEye,
  faEyeSlash,
  faSave,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { UpdatePassword } from 'apps/customer/src/app/@store/Actions/auth.actions';
import {
  GetUserProfile,
  UpdateUserProfile,
} from 'apps/customer/src/app/@store/Actions/user.action';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'play-app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  showOldPassword = false;
  showNewPassword = false;

  oldPassword: string | undefined = undefined;
  newPassword: string | undefined = undefined;
  faSave = faSave;

  //language
  language = 'en';
  theme = 'light';
  //bool indicating if language is changed (used to show save button)
  languageChanged = false;
  themeChanged = false;

  //error message
  errorMessage: string | undefined;
  showErrorMessage = false;
  showChangeThemeMessage = false;
  //success message
  successMessage: string | undefined;
  showSuccessMessage = false;
  showChangeLanguageMessage = false;

  faSearch = faSearch;
  faEyeSlash = faEyeSlash;
  faEye = faEye;

  //loading flag
  loading = false;

  constructor(
    private store: Store,
    private TranService: TranslocoService,
    private toastr: ToastrService
  ) {}

  //get user.lang from local storage

  ngOnInit(): void {
    //dropdown selected language
    this.language =
      this.store.selectSnapshot(
        (state) => state.user.userProfile?.languagePreference
      ) || 'en';

    this.theme = this.store.selectSnapshot(
      (state) => state.user.userProfile?.themePreference || 'light'
    );
  }

  /**
   * @summary Function to change the language of the app
   */
  changeLanguage() {
    this.showChangeLanguageMessage = true;
    //set languageChanged to true
    this.languageChanged = true;
    //get  the value of the select element
    // const target = event_target as HTMLSelectElement;
    // const value = target.value;
    //set the language
    // this.language = value;
    //set language in service
  }

  changeTheme() {
    this.showChangeThemeMessage = true;
    this.themeChanged = true;
  }

  saveTheme() {
    this.showChangeThemeMessage = false;
    const id = this.store.selectSnapshot((state) => state.auth.id);
    //get user profile from store and update the language
    this.store.dispatch(new GetUserProfile(id)).subscribe({
      next: (res) => {
        const profile: UserProfile = res.user.userProfile;
        //create new profile object
        const newProfile: UserProfile = {
          id: profile.id,
          user_Id: profile.user_Id,
          firstName: profile.firstName,
          lastName: profile.lastName,
          companyName: profile.companyName,
          dateOfBirth: profile.dateOfBirth,
          languagePreference: profile.languagePreference || 'en',
          themePreference: this.theme,
          tin: profile.tin || '000000000',
        };
        //call the UpdateProfile action
        this.store.dispatch(new UpdateUserProfile(newProfile)).subscribe({
          next: () => {
            //we are ok
            this.toastr.success(
              'Update Theme',
              'Your Theme has been updated successfully'
            );
            this.themeChanged = false;
          },
          error: (err) => {
            if (err.status === 400) {
              //we have an error
              console.log(err);
              //show error message
              this.errorMessage = 'Something went wrong';
              this.showErrorMessage = true;
            }
          },
          complete: () => {
            location.reload();
          },
        });
      },
      error: (err) => {
        //we have an error
        console.log(err);
        //show message
        this.errorMessage = 'Something went wrong';
        this.toastr.error();
      },
    });
  }

  /**
   * @summary Function to save the language of the app
   */
  saveLanguage() {
    //get user id
    this.showChangeLanguageMessage = false;
    const id = this.store.selectSnapshot((state) => state.auth.id);
    //get user profile from store and update the language
    this.store.dispatch(new GetUserProfile(id)).subscribe({
      next: (res) => {
        const profile: UserProfile = res.user.userProfile;
        //create new profile object
        const newProfile: UserProfile = {
          id: profile.id,
          user_Id: profile.user_Id,
          firstName: profile.firstName,
          lastName: profile.lastName,
          companyName: profile.companyName,
          dateOfBirth: profile.dateOfBirth,
          languagePreference: this.language,
          themePreference: profile.themePreference || 'light',
          tin: profile.tin || '000000000',
        };
        //call the UpdateProfile action
        this.store.dispatch(new UpdateUserProfile(newProfile)).subscribe({
          next: () => {
            //we are ok
            this.toastr.success(
              'Update Language',
              'Your Language has been updated successfully'
            );
            //show success message
            this.TranService.setActiveLang(this.language);
            this.languageChanged = false;
          },
          error: (err) => {
            if (err.status === 400) {
              //we have an error
              console.log(err);
              //show error message
              this.errorMessage = 'Something went wrong';
              this.showErrorMessage = true;
            }
          },
        });
      },
      error: (err) => {
        //we have an error
        console.log(err);
        //show message
        this.errorMessage = 'Something went wrong';
        this.toastr.error();
      },
    });
  }

  /**
   * @summary Function to update the password of the user
   *
   */
  updatePassword() {
    //if any of the fields are empty or undefined show error message and return
    if (
      this.oldPassword === undefined ||
      this.oldPassword === '' ||
      this.newPassword === undefined ||
      this.newPassword === ''
    ) {
      this.errorMessage = 'Please fill all the fields';
      this.showErrorMessage = true;
      return;
    }

    //if the new password is smaller than 6 characters show error message and return
    if (this.newPassword.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
      this.showErrorMessage = true;
      return;
    }

    //if the new password is the same as the old password show error message and return
    if (this.newPassword === this.oldPassword) {
      this.errorMessage = 'New password must be different from old password';
      this.showErrorMessage = true;
      return;
    }
    this.loading = true;
    //hide error message and success message
    this.showErrorMessage = false;
    this.showSuccessMessage = false;
    //get the user id and user email from the store
    const userId = this.store.selectSnapshot((state) => state.auth.id);
    const userEmail = this.store.selectSnapshot((state) => state.auth.email);
    //call the UpdatePassword action
    this.store
      .dispatch(
        new UpdatePassword({
          customer_id: userId,
          email: userEmail,
          old_password: this.oldPassword,
          password: this.newPassword,
        })
      )
      .subscribe({
        next: (res) => {
          //if the password was updated successfully show success message
          if (res) {
            this.showSuccessMessage = true;
            this.successMessage = 'Password updated successfully';
            this.loading = false;
          }
        },
        error: (err) => {
          //if error has return code 400 map to BadRequestResponse
          if (err.status === 400) {
            const error = err.error as BadRequestResponse;
            //show error message
            this.errorMessage = error.errors.Messages[0];
            this.showErrorMessage = true;
          } else {
            //show generic error message and log to console
            this.errorMessage = 'Something went wrong';
            this.showErrorMessage = true;
            console.log(err);
          }
          //hide loading
          this.loading = false;
        },
        complete: () => {
          //hide loading
          this.loading = false;
        },
      });
  }
}
