export interface UserMethods {
  checkPassword: (password: string) => Promise<boolean>;
  generateAuthToken: () => void;
}
