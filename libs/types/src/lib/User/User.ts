export interface User {
  id: string;
  email: string;
  passwordHash: string;
  salt: string;
  username: string;
  role: string;
  loginAttempts: number;
  failedLoginAttempts: number;
  lastLogin: string | null;
  otpSecret: string;
  createdAt: string;
}
