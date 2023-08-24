import { Component, OnInit } from '@angular/core';
import { User } from '@play.app/types/User/User';
import { Store } from '@ngxs/store';
import { GetUsers } from '../../../@store/Actions/users.action';
import { Subscription } from 'rxjs';

@Component({
  selector: 'play-app-events-dashboard',
  templateUrl: './events-dashboard.component.html',
  styleUrls: ['./events-dashboard.component.scss'],
})
export class EventsDashboardComponent implements OnInit {
  //available customers to use when creating a new credit
  customerOptions: string[] = [];
  //all Users
  //subscription
  subscription: Subscription | undefined;
  allUsers: User[] | undefined;
  //boolean
  loading = false;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private store: Store) {}

  ngOnInit(): void {
    // before initializing the component get all users
    this.getAllUsers();
  }
  getAllUsers() {
    //get all users
    this.loading = true; //set loading to true, when get all users is done set it to false and show child componenetes
    this.getUsers().then(
      () => {
        this.loading = false; //set loading to false when promise is resolved
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  //function to get all Users to pass them to table component
  getUsers() {
    return new Promise((resolve, reject) => {
      //get all available users
      this.subscription = this.store
        .dispatch(new GetUsers({ page: 1, pageSize: 1000 }))
        .subscribe({
          next: (response) => {
            this.allUsers = response.users.users;
            this.customerOptions = response.users.users.map(
              (user: any) => user.email //get all users
            );
            resolve(true);
          },
          error: (error) => {
            console.log(error);
            reject(false);
          },
        });
    });
  }
}
