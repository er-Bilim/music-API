import type { HydratedDocument } from 'mongoose';
import type { IUser } from '../types/user.types.ts';
import type { Request, Response, NextFunction } from 'express';
import UsersService from '../services/users/users.service.ts';

export interface RequestWithUser extends Request {
  user: HydratedDocument<IUser>;
}

const auth = async (expressReq: Request, res: Response, next: NextFunction) => {
  const req = expressReq as RequestWithUser;
  const token = req.get('Authorization');

  if (!token) {
    return res.status(401).json({
      error: 'Access denied. No token provided',
    });
  }

  const user = await UsersService.getUserByToken(token);

  if (!user) {
    return res.status(403).json({
      error: 'Access denied. Invalid token',
    });
  }

  req.user = user;
  next();
};

export default auth;
