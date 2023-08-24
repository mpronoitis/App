import { UserProfile } from '@play.app/types/Profile/UserProfile';
import { User } from '@play.app/types/User/User';

export interface UserStateModel {
  users: User[] | null;
  userProfile: UserProfile | null;
  usersCount: number | null;
}
