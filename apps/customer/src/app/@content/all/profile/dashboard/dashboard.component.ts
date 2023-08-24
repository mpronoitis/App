import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserProfile } from '@play.app/types/Profile/UserProfile';
import {
  faEnvelopeOpenText,
  faFileInvoice,
  faUserCircle,
  faUserCog,
} from '@fortawesome/free-solid-svg-icons';
import { TranslocoService } from '@ngneat/transloco';
import { GetUserProfile } from 'apps/customer/src/app/@store/Actions/user.action';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'play-app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userProfile: UserProfile | undefined;
  faFileInvoice = faFileInvoice;
  faUserCircle = faUserCircle;
  faEnvelopeOpenText = faEnvelopeOpenText;
  faUserCog = faUserCog;
  message_text = '';
  loading = false;
  lastLogin: string | undefined;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private store: Store,
    private TranService: TranslocoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.lastLogin = this.store.selectSnapshot((state) => state.auth.lastLogin);

    try {
      this.loading = true;
      this.store
        .select((state) => state.auth.id)
        .subscribe((id) => {
          //get user profile
          this.store.dispatch(new GetUserProfile(id)).subscribe({
            next: (v) => {
              this.loading = false;
              this.userProfile = v.user.userProfile;

              this.TranService.setActiveLang(
                this.userProfile?.languagePreference || 'en'
              );
            },
            error: (e) => {
              if (e.status === 400) {
                this.toastr.error("Can't get user profile");
              } else {
                //show error message
                this.toastr.error();
                console.log(e);
              }
            },
          });
        });
    } catch {
      //show error message
      this.toastr.error();
    }
  }
}
