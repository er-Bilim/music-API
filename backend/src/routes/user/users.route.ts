import { Router } from 'express';
import UsersController from '../../controllers/users/users.controller.ts';
import auth from '../../middlewares/auth.ts';

const usersRouter = Router();

usersRouter.post('/', UsersController.registration);

usersRouter.post('/sessions', UsersController.authentication);

usersRouter.delete('/sessions', auth, UsersController.logout);

export default usersRouter;
