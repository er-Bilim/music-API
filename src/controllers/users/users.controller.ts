import type { NextFunction, Request, Response } from 'express';
import type { IUserReg } from '../../types/user.types.js';
import { Error } from 'mongoose';
import UsersService from '../../services/users/users.service.js';

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
}

export default UsersController;
