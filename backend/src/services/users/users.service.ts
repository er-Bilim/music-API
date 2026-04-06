import type { HydratedDocument } from 'mongoose';
import User from '../../model/user/User.ts';
import type { IUser, IUserReg } from '../../types/user.types.ts';

const UsersService = {
  registration: async (data: IUserReg): Promise<IUserReg> => {
    const user = new User(data);
    user.generateAuthToken();
    return await user.save();
  },

  authentication: async (
    username: string,
    password: string,
  ): Promise<{ user: IUser | null; isMatch: boolean }> => {
    const user = await User.findOne({ username });
    const data = { user, isMatch: false };

    if (user) {
      const isMatch: boolean = await user.checkPassword(password);

      data.user = user;
      if (isMatch) {
        data.isMatch = isMatch;
        data.user.generateAuthToken();
        await data.user.save();
      }
    }

    return data;
  },

  logout: async (user: HydratedDocument<IUser>): Promise<void> => {
    user.token = '';
    await user.save();
  },

  getUserByToken: async (token: string) => {
    const user = await User.findOne({ token });
    return user;
  },
};

export default UsersService;
