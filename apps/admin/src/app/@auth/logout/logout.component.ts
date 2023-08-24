import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Logout } from '../../@store/Actions/auth.actions';

@Component({
  selector: 'play-app-admin-logout',
  template: `<p>Goodbye 👋</p> `,
  styles: [``],
})
export class AdminLogoutComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new Logout()).subscribe({
      next: (res) => {
        //navigate to login page
        location.href = '/auth/login';
      },
    });
  }
}
