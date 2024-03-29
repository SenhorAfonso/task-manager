import express from 'express';
import TaskController from './controller/taskController';
import ValidationMiddleware from '../middleware/ValidationMiddleware';
import ValidateTask from './validations/validateTask';
import AuthenticationMiddleware from '../middleware/AuthenticationMiddleware';

const taskRouter = express.Router();

taskRouter.post('/task', [
  AuthenticationMiddleware.AuthenticateToken,
  ValidationMiddleware.ValidatePayload(ValidateTask.createTaks(), 'body')
], TaskController.CreateTask);

taskRouter.get('/task', [
  AuthenticationMiddleware.AuthenticateToken
], TaskController.getTasks);

taskRouter.get('/task-array', [
  AuthenticationMiddleware.AuthenticateToken
], TaskController.getTaksByArray);

taskRouter.get('/task/:id', [
  AuthenticationMiddleware.AuthenticateToken
], TaskController.getSingleTask);

taskRouter.put('/task/:id', [
  AuthenticationMiddleware.AuthenticateToken,
  ValidationMiddleware.ValidatePayload(ValidateTask.updateTask(), 'body')
], TaskController.updateTask);

taskRouter.delete('/task/:id', [
  AuthenticationMiddleware.AuthenticateToken
], TaskController.deleteTask);

export default taskRouter;
