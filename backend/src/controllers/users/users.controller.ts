import type { NextFunction, Request, Response } from 'express';
import type { IUserReg } from '../../types/user.types.ts';
import { Error } from 'mongoose';
import UsersService from '../../services/users/users.service.ts';
import type { RequestWithUser } from '../../middlewares/auth.ts';
import { clearCookieToken, setCookieToken } from '../../utils/sendToken.ts';

const UsersController = {
  registration: async (req: Request, res: Response, next: NextFunction) => {
    const body: IUserReg = req.body;

    const correctUserData: IUserReg = {
      username: body.username,
      displayName: body.displayName,
      password: body.password,
      avatar: req.file ? `images/${req.file.filename}` : null,
    };

    try {
      const user = await UsersService.registration(correctUserData);

      setCookieToken(res, user.token);

      res.json({ message: 'Registration successful', user });
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        return res.status(400).json(error);
      }

      next(error);
    }
  },
  googleAuth: async (req: Request, res: Response, next: NextFunction) => {
    const credential: string = req.body.credential;
    if (!credential) {
      res.status(403).json({
        message: 'Credential not found',
      });
    }
    const data = await UsersService.googleAuth(credential);

    if (!data) {
      return res.status(400).json({
        message: 'Google login error',
      });
    }

    setCookieToken(res, data.token);
    res.send({
      message: data.isNewUser
        ? 'Registration successful'
        : 'Authentication successful',
      user: data.user,
    });
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

      setCookieToken(res, user.token);

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

      clearCookieToken(res, user.token);

      return res.json({
        message: 'Logout successfully!',
      });
    } catch (error) {
      next(error);
    }
  },
};

export default UsersController;
