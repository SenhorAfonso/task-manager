import express from 'express';
import TaskController from './task/controller/taskController';
import ValidationMiddleware from './middleware/ValidationMiddleware';
import ValidateTask from './task/validations/validateTask';

const taskRouter = express.Router();

taskRouter.post('/task', [
  ValidationMiddleware.ValidatePayload(ValidateTask.createTaks(), 'body')
], TaskController.CreateTask);

taskRouter.get('/task', TaskController.getTasks);

taskRouter.get('/task/:id', TaskController.getSingleTask);

taskRouter.put('/task/:id', [
  ValidationMiddleware.ValidatePayload(ValidateTask.updateTask(), 'body')
], TaskController.updateTask);

taskRouter.delete('/task/:id', TaskController.deleteTask);

export default taskRouter;
