import { Component } from '@angular/core';
import {
  faArrowRight,
  faBars,
  faBell,
  faClose,
  faDashboard,
  faHome,
  faPeopleGroup,
  faReceipt,
  faSearch,
  faSignOut,
  faTimes,
  faServer,
  faBuildingColumns,
  faShieldVirus,
  faFileContract,
  faMailBulk,
  faHistory,
} from '@fortawesome/free-solid-svg-icons';
import { faWhmcs } from '@fortawesome/free-brands-svg-icons';
import { Store } from '@ngxs/store';
import { UpdateToken } from '../../@store/Actions/auth.actions';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthState } from '../../@store/States/auth.state';
import { MatDialog } from '@angular/material/dialog';
import { AdminLogoutDialogComponent } from '../../@dialogs/Auth/logout-dialog/logout-dialog.component';

@Component({
  selector: 'play-app-admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  activatedRoute: string | undefined;
  mobile = false;
  routerSub: Subscription;

  faDashboard = faDashboard;
  faBars = faBars;
  faReceipt = faReceipt;
  faTimes = faTimes;
  faSignOut = faSignOut;
  faArrowRight = faArrowRight;
  faHome = faHome;
  faBell = faBell;
  faPeopleGroup = faPeopleGroup;
  faClose = faClose;
  faSearch = faSearch;
  faServer = faServer;
  faBuildingColumns = faBuildingColumns;
  faWhmcs = faWhmcs;
  faShieldVirus = faShieldVirus;
  faFileContract = faFileContract;
  faMailBulk = faMailBulk;
  faHistory = faHistory;

  email: string;
  toggle = false;
  token = localStorage.getItem('auth.token')?.replace(/['"]+/g, '');
  showSpinner = false;
  /**boolean for when to show spinner */
  showBadge = false;
  //boolean for when to show badge, show it when time to expiration is less than 30min
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
          if (timeToTokenExpiration == 0 || timeToTokenExpiration < 0) {
            observer.complete();
            this.router.navigate(['/auth/logout']).then((r) => r);
          }
        }
      }, 1000);
    }
  );

  constructor(
    private store: Store,
    private router: Router,
    private JwtHelper: JwtHelperService,
    private dialog: MatDialog
  ) {
    //subscribe to navigation end event
    this.routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activatedRoute = event.url;
      }
    });
    this.email = localStorage.getItem('auth.email') || '';
    //strip email from '
    this.email = this.email.replace(/"/g, '');
  }

  renewToken() {
    this.showSpinner = true; //show spinner because we are renewing token
    this.store.dispatch(new UpdateToken());

    //wait for 1 second to update token
    setTimeout(() => {
      this.token = localStorage.getItem('auth.token')?.replace(/['"]+/g, '');
      this.showSpinner = false; //after 1 sec hide spinner and show expiration time
    }, 1000);
  }

  openLogoutDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ) {
    this.dialog
      .open(AdminLogoutDialogComponent, {
        width: '300px',
        enterAnimationDuration,
        exitAnimationDuration,
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          //if user clicked yes, logout
          this.router.navigate(['/auth/logout']).then((r) => r);
        }
      });
  }

  toggleSidebar() {
    this.toggle = !this.toggle;
  }
}
