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

  static async getSingleTask (
    req: Request,
    res: Response
  ) {
    const { id } = req.params;

    const { success, status, message, result } = await TaskService.getSingleTask({ _id: id });
    res.status(status).json({ success, message, result });
  }

  static async updateTask (
    req: Request,
    res: Response
  ) {
    const { id } = req.params;
    const newTaskInfo = req.body;

    const { success, status, message, result } = await TaskService.updateTask({ _id: id }, newTaskInfo);
    res.status(status).json({ success, message, result });
  }

  static async deleteTask (
    req: Request,
    res: Response
  ) {
    const { id } = req.params;

    const { success, status, message, result } = await TaskService.deleteTask({ _id: id });
    res.status(status).json({ success, message, 'deleted task': result });
  }

}

export default TaskController;