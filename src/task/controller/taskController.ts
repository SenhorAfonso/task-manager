import { Response } from 'express';
import TaskService from '../service/taskService';
import AuthenticatedRequest from '../../interface/AuthenticatedRequest';

class TaskController {

  static async CreateTask (
    req: AuthenticatedRequest,
    res: Response
  ) {
    const { title, description, type, category } = req.body;
    const { userID } = req.user!;
    const { success, status, message, result } = await TaskService.createTask({ userID, title, description, type, category });

    res.status(status).json({ success, message, result });
  }

  static async getTasks (
    req: AuthenticatedRequest,
    res: Response
  ) {
    const { userID } = req.user!;
    const { success, status, message, result } = await TaskService.getAllTasks({ userID });

    res.status(status).json({ success, message, result });
  }

  static async getSingleTask (
    req: AuthenticatedRequest,
    res: Response
  ) {
    const { id } = req.params;

    const { success, status, message, result } = await TaskService.getSingleTask({ _id: id });
    res.status(status).json({ success, message, result });
  }

  static async updateTask (
    req: AuthenticatedRequest,
    res: Response
  ) {
    const { id } = req.params;
    const newTaskInfo = req.body;

    const { success, status, message, result } = await TaskService.updateTask({ _id: id }, newTaskInfo);
    res.status(status).json({ success, message, result });
  }

  static async deleteTask (
    req: AuthenticatedRequest,
    res: Response
  ) {
    const { id } = req.params;

    const { success, status, message, result } = await TaskService.deleteTask({ _id: id });
    res.status(status).json({ success, message, 'deleted task': result });
  }

}

export default TaskController;