export interface IUser {
  username: string;
  password: string;
  token: string;
  role: string;
}

export type IUserReg = Omit<IUser, 'token'>;
