import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Logout } from '../../@store/Actions/auth.actions';
import { EmptyUserProfile } from '../../@store/Actions/user.action';

@Component({
  selector: 'play-app-logout',
  template: ` <p>Goodbye 👋</p> `,
  styles: [``],
})
export class LogoutComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    //logout user
    this.store.dispatch(new EmptyUserProfile());
    this.store.dispatch(new Logout());
    location.href = '/auth/login';
  }
}
