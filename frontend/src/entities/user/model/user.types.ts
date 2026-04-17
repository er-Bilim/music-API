export interface IUser {
  message: string;
  user: {
    username: string;
    displayName: string;
    avatar: string;
    token: string;
    role: string;
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
