import { RegisterUser } from '@play.app/types/Auth/RegisterUser';
import { UserProfile } from '@play.app/types/Profile/UserProfile';

export class GetUsers {
  static readonly type = '[Users] Get Users';

  constructor(public payload: { page: number; pageSize: number }) {}
}

export class CreateUser {
  static readonly type = '[Users] Create User';

  constructor(public payload: RegisterUser) {}
}

export class GetUserProfile {
  static readonly type = '[Users] Get User Profile';

  constructor(public userId: string) {}
}

export class UpdateUserProfile {
  static readonly type = '[Users] Update User Profile';

  constructor(public payload: UserProfile) {}
}

export class DeleteUser {
  static readonly type = '[Users] Delete User';

  constructor(public userId: string) {}
}

export class UpdatePasswordUser {
  static readonly type = '[Users] Update Password';

  constructor(
    public payload: { userId: string; email: string; password: string }
  ) {}
}

export class UpdateRoleUser {
  static readonly type = '[Users] Update Role';

  constructor(
    public payload: { userId: string; email: string; role: string }
  ) {}
}

/**
 * @summary - This method is used to get the count of users created within a given time range
 * @param startDateTime - The start date time
 * @param endDateTime - The end date time
 */
export class GetCountByDate {
  static readonly type = '[Users] Get Count By Date';

  constructor(public payload: { startDateTime: string; endDateTime: string }) {}
}
