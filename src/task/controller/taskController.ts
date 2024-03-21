import { Response, Request } from 'express';
import TaskService from '../service/taskService';

class TaskController {

  static async CreateTask (
    req: Request,
    res: Response
  ) {
    const { title, description, type, category } = req.body;
    const { success, status, message, result } = await TaskService.createTask({ title, description, type, category });

    res.status(status).json({ success, message, result });
  }

  static async getTasks (
    req: Request,
    res: Response
  ) {
    const { success, status, message, result } = await TaskService.getAllTasks();

    res.status(status).json({ success, message, result });
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