export interface IUser {
  username: string;
  password: string;
  token: string;
}

export type IUserReg = Omit<IUser, 'token'>;
