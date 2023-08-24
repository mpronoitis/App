/**
 * Actions to be performed on the user store
 */

import { UserProfile } from '@play.app/types/Profile/UserProfile';

export class GetUserProfile {
  static readonly type = '[User] Get User Profile';

  constructor(public userId: string) {}
}

export class UpdateUserProfile {
  static readonly type = '[User] Update User Profile';

  constructor(public userProfile: UserProfile) {}
}

export class EmptyUserProfile {
  static readonly type = '[User] Empty User Profile';
}
