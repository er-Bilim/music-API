import { Router } from 'express';
import UsersController from '../../controllers/users/users.controller.ts';
import auth from '../../middlewares/auth.ts';
import { imagesUpload } from '../../middlewares/multer.ts';

const usersRouter = Router();

usersRouter.post(
  '/',
  imagesUpload.single('image'),
  UsersController.registration,
);

usersRouter.post(
  '/google',
  imagesUpload.single('avatar'),
  UsersController.googleAuth,
);

usersRouter.post('/sessions', UsersController.authentication);

usersRouter.delete('/sessions', auth, UsersController.logout);

export default usersRouter;
