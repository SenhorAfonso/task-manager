import express from 'express';
import TaskController from './task/controller/taskController';

const taskRouter = express.Router();

taskRouter.post('/task', TaskController.CreateTask);

taskRouter.get('/task', TaskController.getTasks);

taskRouter.get('/task/:id', TaskController.getSingleTask);

taskRouter.put('/task/:id', TaskController.updateTask);

taskRouter.delete('/task/:id', TaskController.deleteTask);

export default taskRouter;
