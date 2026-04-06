import type { NextFunction, Request, Response } from 'express';
import type { IUserReg } from '../../types/user.types.ts';
import { Error } from 'mongoose';
import UsersService from '../../services/users/users.service.ts';
import type { RequestWithUser } from '../../middlewares/auth.ts';

const UsersController = {
  registration: async (req: Request, res: Response, next: NextFunction) => {
    const body: IUserReg = req.body;

    const correctUserData: IUserReg = {
      username: body.username,
      password: body.password,
    };

    try {
      const user = await UsersService.registration(correctUserData);
      res.json({ message: 'Registration successful', user });
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
        return res.status(404).json({ error: 'User is not found' });
      }

      if (!isMatch) {
        return res.status(401).json({ error: 'Password is incorrect' });
      }

      return res.json({ message: 'Authentication successful', user });
    } catch (error) {
      next(error);
    }
  },

  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userReq = req as RequestWithUser;

      const user = userReq.user;

      await UsersService.logout(user);

      return res.json({
        message: 'Logout successfully!',
      });
    } catch (error) {
      next(error);
    }
  },
};

export default UsersController;
