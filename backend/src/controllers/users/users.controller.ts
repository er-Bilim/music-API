import type { NextFunction, Request, Response } from 'express';
import type { IUserReg } from '../../types/user.types.js';
import { Error } from 'mongoose';
import UsersService from '../../services/users/users.service.js';
import argon2d from 'argon2';

class UsersController {
  static registration = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
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
  };

  static authentication = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
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
      return res
        .status(500)
        .json({ message: 'Internal server error, sorry :(' });
    }
  };
}

export default UsersController;
