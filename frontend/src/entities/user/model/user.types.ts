export interface IUser {
  message: string;
  user: {
    username: string;
    token: string;
  };
}

export interface IRegister {
  username: string;
  password: string;
}

export interface ILogin {
  username: string;
  password: string;
}
