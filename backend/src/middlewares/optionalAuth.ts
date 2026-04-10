import type { Request, Response, NextFunction } from 'express';
import type { HydratedDocument } from 'mongoose';
import type { IUser } from '../types/user.types.ts';
import jwt from 'jsonwebtoken';
import config from '../config.ts';
import User from '../model/user/User.ts';

export interface RequestOptionalUser extends Request {
  user: HydratedDocument<IUser>;
}

const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userReq = req as RequestOptionalUser;
  const token = req.cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, config.jwtSecret) as { _id: string };
      const user = await User.findOne({ _id: decoded._id, token });

      if (!user) {
        return res.status(403).json({
          error: 'Access denied. Invalid token',
        });
      }

      userReq.user = user;
    } catch (error) {
      next(error);
    }
  }

  next();
};

export default optionalAuth;
