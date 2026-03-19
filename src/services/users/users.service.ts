import User from '../../model/user/User.js';
import type { IUser, IUserReg } from '../../types/user.types.js';

class UsersService {
  static registration = async (data: IUserReg): Promise<IUserReg> => {
    const user = new User(data);
    user.generateAuthToken();
    return await user.save();
  };

  static authentication = async (
    username: string,
    password: string,
  ): Promise<{ user: IUser | null; isMatch: boolean }> => {
    const user = await User.findOne({ username });
    const data = { user, isMatch: false };

    if (user) {
      const isMatch: boolean = await user.checkPassword(password);

      data.user = user;
      if (isMatch) {
        data.isMatch = true;
      }
    }

    return data;
  };
}

export default UsersService;
