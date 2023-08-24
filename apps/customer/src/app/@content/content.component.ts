import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserProfile } from '@play.app/types/Profile/UserProfile';
import { BadRequestResponse } from '@play.app/types/Response/BadRequestResponse';
import { ToastrService } from 'ngx-toastr';
import { GetUserProfile } from '../@store/Actions/user.action';

@Component({
  selector: 'play-app-content',
  template: `
    <div
      [ngClass]="{
        dark: darkTheme
      }"
    >
      <play-app-header></play-app-header>

      <router-outlet></router-outlet>
      <play-app-footer></play-app-footer>
    </div>
  `,
  styles: [``],
})
export class ContentComponent {
  userProfile: UserProfile | undefined;
  message_text = '';
  darkTheme = false;

  constructor(private store: Store, private toastr: ToastrService) {
    try {
      this.store
        .select((state) => state.auth.id)
        .subscribe((id) => {
          //get user profile
          this.store.dispatch(new GetUserProfile(id)).subscribe({
            next: (v) => {
              this.userProfile = v.user.userProfile;

              this.darkTheme = this.userProfile?.themePreference === 'dark';
            },
            error: (e) => {
              if (e.status === 400) {
                this.toastr.error("Can't get user profile");
              } else {
                throw e;
              }
            },
          });
        });
    } catch {
      this.toastr.error();
    }
  }
}
