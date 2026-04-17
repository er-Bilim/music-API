export interface IUser {
  username: string;
  displayName: string;
  avatar: string | null;
  password: string;
  token: string;
  role: string;
  googleID: string;
}

export type IUserSave = Omit<IUser, 'role'>;
export type IUserReg = Omit<IUser, 'role' | 'token' | 'googleID'>;
