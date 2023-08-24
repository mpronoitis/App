import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';

import { UserStateModel } from '../Models/UserStateModel';
import { UsersService } from '@play.app/services/Users/users.service';
import {
  CreateUser,
  DeleteUser,
  GetCountByDate,
  GetUserProfile,
  GetUsers,
  UpdatePasswordUser,
  UpdateRoleUser,
  UpdateUserProfile,
} from '../Actions/users.action';
import { tap } from 'rxjs';
import { UserProfile } from '@play.app/types/Profile/UserProfile';
import { ToastrService } from 'ngx-toastr';

@State<UserStateModel>({
  name: 'users',
  defaults: {
    users: null,
    userProfile: null,
    usersCount: null,
  },
})
@Injectable()
export class UsersState {
  @Selector()
  static getUsers(state: UserStateModel): any[] | null {
    return state.users || null;
  }

  constructor(
    private UsersService: UsersService,
    private toastr: ToastrService
  ) {}

  @Action(GetUsers)
  getAllUsers(ctx: StateContext<UserStateModel>, action: GetUsers) {
    return this.UsersService.getAllUsers(
      action.payload.page,
      action.payload.pageSize
    ).pipe(
      tap({
        next: (res) => {
          ctx.patchState({
            users: res, //get all products here
          });
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error(
              'Error while getting users, please try again later'
            );
          }
        },
      })
    );
  }

  @Action(CreateUser)
  createUser(ctx: StateContext<UserStateModel>, action: CreateUser) {
    return this.UsersService.registerUser(action.payload).pipe(
      tap({
        next: (res) => {
          console.log(res);
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error(
              'Error while registering user, please try again later'
            );
          }
        },
      })
    );
  }

  @Action(GetUserProfile)
  getUserProfile(ctx: StateContext<UserStateModel>, action: GetUserProfile) {
    return this.UsersService.getUserProfile(action.userId).pipe(
      tap({
        next: (res) => {
          ctx.patchState({
            userProfile: res,
          });
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error(
              'Error while getting user profile, please try again later'
            );
          }
        },
      })
    );
  }

  @Action(UpdateUserProfile)
  updateUserProfile(
    ctx: StateContext<UserStateModel>,
    action: UpdateUserProfile
  ) {
    return this.UsersService.updateUserProfile(action.payload).pipe(
      tap({
        next: (res) => {
          console.log(res);
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error(
              'Error while updating user profile, please try again later'
            );
          }
        },
      })
    );
  }

  @Action(DeleteUser)
  deleteUser(ctx: StateContext<UserStateModel>, action: DeleteUser) {
    return this.UsersService.deleteUser(action.userId).pipe(
      tap({
        next: (res) => {
          console.log(res);
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error(
              'Error while deleting user, please try again later'
            );
          }
        },
      })
    );
  }

  @Action(UpdatePasswordUser)
  forgotPassword(
    ctx: StateContext<UserStateModel>,
    action: UpdatePasswordUser
  ) {
    return this.UsersService.updatePassword(
      action.payload.userId,
      action.payload.email,
      action.payload.password
    ).pipe(
      tap({
        next: (res) => {
          console.log(res);
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error(
              'Error while updating password, please try again later'
            );
          }
        },
      })
    );
  }

  @Action(UpdateRoleUser)
  updateRole(ctx: StateContext<UserStateModel>, action: UpdateRoleUser) {
    return this.UsersService.updateRole(
      action.payload.userId,
      action.payload.email,
      action.payload.role
    ).pipe(
      tap({
        next: (res) => {
          console.log(res);
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error(
              'Error while updating role, please try again later'
            );
          }
        },
      })
    );
  }

  /**
   * @summary - This method is used to get the count of users created within a given time range
   */
  @Action(GetCountByDate)
  getCountByDate(ctx: StateContext<UserStateModel>, action: GetCountByDate) {
    return this.UsersService.getCountByDate(
      action.payload.startDateTime,
      action.payload.endDateTime
    ).pipe(
      tap({
        next: (res) => {
          ctx.patchState({
            usersCount: res,
          });
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error(
              'Error while getting users count, please try again later'
            );
          }
        },
      })
    );
  }
}
