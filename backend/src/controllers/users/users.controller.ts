import type { NextFunction, Request, Response } from 'express';
import type { IUserReg } from '../../types/user.types.ts';
import { Error } from 'mongoose';
import UsersService from '../../services/users/users.service.ts';

const UsersController = {
  registration: async (req: Request, res: Response, next: NextFunction) => {
    const body: IUserReg = req.body;

    const correctUserData: IUserReg = {
      username: body.username,
      password: body.password,
    };

    try {
      const user = await UsersService.registration(correctUserData);
      res.json(user);
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        return res.status(400).json(error);
      }

      next(error);
    }
  },

  authentication: async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    try {
      const { user, isMatch } = await UsersService.authentication(
        username,
        password,
      );

      if (!user) {
        return res.json({ message: 'User is not found' });
      }

      if (!isMatch) {
        return res.json({ message: 'Password is incorrect' });
      }

      return res.json({ message: 'Authentication successful' });
    } catch (error) {
      next(error);
    }
  },
};

export default UsersController;
