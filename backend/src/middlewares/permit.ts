import type { Request, Response, NextFunction } from 'express';
import type { RequestWithUser } from './auth.ts';

const permit = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { user } = req as RequestWithUser;

    if (!roles.includes(user.role)) {
      return res.status(403).json({
        error: 'You don`t have permission to perform this action',
      });
    }

    next();
  };
};

export default permit;
