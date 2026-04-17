import type { HydratedDocument } from 'mongoose';
import User from '../../model/user/User.ts';
import type { IUser, IUserReg, IUserSave } from '../../types/user.types.ts';
import { OAuth2Client } from 'google-auth-library';
import config from '../../config.ts';

const UsersService = {
  registration: async (data: IUserReg): Promise<IUserSave> => {
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

  googleAuth: async (
    credential: string,
  ): Promise<{ user: IUser; token: string; isNewUser: boolean } | null> => {
    const client = new OAuth2Client(config.clientID);

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: config.clientID,
    });

    const payload = ticket.getPayload();

    if (!payload) return null;

    const {
      email: username,
      sub: googleID,
      given_name: displayName,
      picture: avatar,
    } = payload;

    let user = await User.findOne({ googleID });
    let isNewUser: boolean = false;

    if (!user) {
      const generatePassword = crypto.randomUUID();

      user = new User({
        username,
        password: generatePassword,
        googleID,
        displayName,
        avatar,
      });

      await user.save();
      isNewUser = true;
    }

    const token = user.generateAuthToken();

    return { user, token, isNewUser };
  },
};

export default UsersService;
