import express from 'express';
import UserController from './controller/userController';

const userRouter = express.Router();

userRouter.post('/user/signup', UserController.register);

userRouter.post('/user/login', UserController.login);

export default userRouter;