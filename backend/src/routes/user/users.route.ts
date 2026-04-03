import { Router } from 'express';
import UsersController from '../../controllers/users/users.controller.ts';
import auth from '../../middlewares/auth.ts';

const usersRouter = Router();

usersRouter.post('/', UsersController.registration);

usersRouter.post('/sessions', auth, UsersController.authentication);

export default usersRouter;
