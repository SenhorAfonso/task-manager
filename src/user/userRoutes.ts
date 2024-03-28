import express from 'express';
import UserController from './controller/userController';
import ValidationMiddleware from '../middleware/ValidationMiddleware';
import ValidateUser from './validations/validateUser';

const userRouter = express.Router();

userRouter.post('/user/signup', [
  ValidationMiddleware.ValidatePayload(ValidateUser.registerUser(), 'body')
] , UserController.register);

userRouter.post('/user/login', [
  ValidationMiddleware.ValidatePayload(ValidateUser.loginUser(), 'body')
], UserController.login);

export default userRouter;