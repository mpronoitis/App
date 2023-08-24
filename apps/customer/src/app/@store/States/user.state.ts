import { Injectable } from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { UserProfileService } from '@play.app/services/User/user-profile.service';
import { UserProfile } from '@play.app/types/Profile/UserProfile';
import {
  EmptyUserProfile,
  GetUserProfile,
  UpdateUserProfile,
} from '../Actions/user.action';
import { UserStateModel } from '../Models/UserStateModel';
import { tap } from 'rxjs';
import { Logout } from '../Actions/auth.actions';

@State<UserStateModel>({
  name: 'user',
  defaults: {
    userProfile: null,
  },
})
@Injectable()
export class UserState {
  constructor(
    private profileService: UserProfileService,
    private store: Store
  ) {}

  /**
   * @description - This method is used to get the user profile based on the user id,
   * it also updates the user profile in the state
   * @param patchState
   * @param {string} userId - The user id
   */
  @Action(GetUserProfile)
  getUserProfile(
    { patchState }: StateContext<UserStateModel>,
    { userId }: GetUserProfile
  ) {
    //if the user id is null, return
    if (!userId) {
      //logout the user
      this.store.dispatch(new Logout());
      return;
    }
    return this.profileService.getUserProfile(userId).pipe(
      tap((profile: UserProfile) => {
        patchState({
          userProfile: profile,
        });
      })
    );
  }

  /**
   * @description - This method is used to update the user profile in the state
   * @param patchState
   * @param {any} userProfile - The user profile
   *
   */
  @Action(UpdateUserProfile)
  updateUserProfile(
    { patchState }: StateContext<UserStateModel>,
    { userProfile }: UpdateUserProfile
  ) {
    return this.profileService.updateUserProfile(userProfile).pipe(
      //if the update returns a success response, update the user profile in the state
      tap((response: any) => {
        patchState({
          userProfile: userProfile,
        });
      })
    );
  }

  @Action(EmptyUserProfile)
  emptyUserProfile({ patchState }: StateContext<UserStateModel>) {
    patchState({
      userProfile: null,
    });

    localStorage.clear();
  }
}
