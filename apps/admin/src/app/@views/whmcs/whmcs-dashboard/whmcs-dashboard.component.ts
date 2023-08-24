import { Component } from '@angular/core';
import {
  faUsers,
  faCartPlus,
  faBasketShopping,
} from '@fortawesome/free-solid-svg-icons';
import { faWhmcs } from '@fortawesome/free-brands-svg-icons';

@Component({
  templateUrl: './whmcs-dashboard.component.html',
  styleUrls: ['./whmcs-dashboard.component.scss'],
})
export class WhmcsDashboardComponent {
  loading = false;

  //icons
  faUsers = faUsers;
  faCartPlus = faCartPlus;
  faWhmcs = faWhmcs;
  faBasketShopping = faBasketShopping;

  //tab flags
  show_users = false;
  show_orders = false;
  show_products = false;
  show_system = false;

  //eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
    this.show_users = true;
  }
}
