import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import {
  faArrowDown,
  faBars,
  faBell,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngxs/store';
import { AuthState } from '../../@store/States/auth.state';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UpdateToken } from '../../@store/Actions/auth.actions';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../../@dialogs/auth/logout-dialog/logout-dialog.component';

@Component({
  selector: 'play-app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  //boolean representing if mobile dropdown button is clicked
  mobile: boolean;
  showDropDown: boolean;
  activatedRoute: string | undefined;
  email: string;
  routerSub: Subscription;
  faBell = faBell;
  faBars = faBars;
  faTimes = faTimes;
  faArrowDown = faArrowDown;
  token = localStorage.getItem('auth.token')?.replace(/['"]+/g, '') || '';
  dialog_subscription: Subscription | undefined;
  isDarkEnabled = false;
  showSpinner = false; //boolean for when to show spinner
  showBadge = false; //boolean for when to show badge, show it when time to expiration is less than 30min
  timeToTokenExpiration: Observable<number> = new Observable<number>(
    (observer) => {
      //update time to token expiration every 1 seconds
      setInterval(() => {
        const expirationDate = this.JwtHelper.getTokenExpirationDate(
          this.token
        );
        if (expirationDate != null) {
          const now = new Date();
          const timeToTokenExpiration =
            expirationDate.getTime() - now.getTime();
          if (timeToTokenExpiration < 30000) {
            this.showBadge = true;
          }

          observer.next(timeToTokenExpiration);
          if (timeToTokenExpiration == 0) {
            this.router.navigate(['/auth/logout']).then((r) => r);
          }
        }
      }, 1000);
    }
  );

  constructor(
    private router: Router,
    private store: Store,
    private JwtHelper: JwtHelperService,
    private dialog: MatDialog
  ) {
    this.mobile = false;
    this.showDropDown = false;
    //subscribe to navigation end event
    this.routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activatedRoute = event.url;
      }
    });
    //email used for gravatar
    this.email = localStorage.getItem('auth.email') || '';
  }

  togglerTheme() {
    this.isDarkEnabled = !this.isDarkEnabled;
  }

  renewToken() {
    this.showSpinner = true; //show spinner because we are renewing token
    this.store.dispatch(new UpdateToken());

    //wait for 1 second to update token
    setTimeout(() => {
      this.token =
        localStorage.getItem('auth.token')?.replace(/['"]+/g, '') || '';
      this.showSpinner = false; //after 1 sec hide spinner and show expiration time
    }, 1000);
  }

  ngOnInit(): void {
    //initialize mobile to false
    this.mobile = false;
  }

  /**
   * @summary Display logout dialog
   * @param enterAnimationDuration
   * @param exitAnimationDuration
   */
  openLogoutDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ) {
    this.dialog.open(LogoutDialogComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  /**
   * on destroy unsubscribe from router events if it still exists
   */
  ngOnDestroy() {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }

    if (this.dialog_subscription) {
      this.dialog_subscription.unsubscribe();
    }
  }
}
