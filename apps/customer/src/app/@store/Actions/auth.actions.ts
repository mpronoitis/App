/**
 * Actions to be performed on the auth store
 * - login
 * - logout
 * - refresh token
 * - check token
 * - check token expiration
 * - register
 * - forgot password
 */

import { loginUser } from '@play.app/types/Auth/loginUser';
import { RegisterUser } from '@play.app/types/Auth/RegisterUser';

//do something after
//this.store.dispatch(new AddAnimal(name)).subscribe(() => this.form.reset());

export class Login {
  static readonly type = '[Auth] Do Login';

  constructor(public payload: loginUser) {}
}

export class Logout {
  static readonly type = '[Auth] Do Logout';
}

export class ValidateToken {
  static readonly type = '[Auth] Validate Token';
}

export class UpdateToken {
  static readonly type = '[Auth] Update Token';
}

export class UpdatePassword {
  static readonly type = '[Auth] Update Password';

  constructor(
    public payload: {
      customer_id: string;
      email: string;
      old_password: string;
      password: string;
    }
  ) {}
}

export class Register {
  static readonly type = '[Auth] Do Register';

  constructor(public payload: RegisterUser) {}
}

export class ForgotPassword {
  static readonly type = '[Auth] Do Forgot Password';

  constructor(public payload: { email: string }) {}
}
