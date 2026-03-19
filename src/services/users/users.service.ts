import User from '../../model/User.js';
import type { IUserReg } from '../../types/user.types.js';

class UsersService {
  static registration = async (data: IUserReg): Promise<IUserReg> => {
    const user = new User(data);
    user.generateAuthToken();
    return await user.save();
  };
}

export default UsersService;
