import { Response, Request } from 'express';
import TaskService from '../service/taskService';

class TaskController {

  static CreateTask (
    req: Request,
    res: Response
  ) {
    const result = TaskService.createTask();
    res.send(result);
  }

  static getTasks (
    req: Request,
    res: Response
  ) {
    const result = TaskService.getAllTasks();
    res.send(result);
  }

  static getSingleTask (
    req: Request,
    res: Response
  ) {
    const result = TaskService.getSingleTask();
    res.send(result);
  }

  static updateTask (
    req: Request,
    res: Response
  ) {
    const result = TaskService.updateTask();
    res.send(result);
  }

  static deleteTask (
    req: Request,
    res: Response
  ) {
    const result = TaskService.deleteTask();
    res.send(result);
  }

}

export default TaskController;