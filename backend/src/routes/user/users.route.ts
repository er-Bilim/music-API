import { Router } from 'express';
import UsersController from '../../controllers/users/users.controller.ts';

const usersRouter = Router();

usersRouter.post('/', UsersController.registration);

usersRouter.post('/sessions', UsersController.authentication);

export default usersRouter;
