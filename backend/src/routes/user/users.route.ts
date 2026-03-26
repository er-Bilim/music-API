import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import UsersController from '../../controllers/users/users.controller.ts';

const usersRouter = Router();

usersRouter.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    await UsersController.registration(req, res, next);
  },
);

usersRouter.post(
  '/sessions',
  async (req: Request, res: Response, next: NextFunction) => {
    await UsersController.authentication(req, res, next);
  },
);

export default usersRouter;
