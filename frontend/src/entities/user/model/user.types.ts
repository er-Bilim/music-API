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
  displayName: string;
  image?: File | null;
}

export interface ILogin {
  username: string;
  password: string;
}
