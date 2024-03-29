import createTask from '../DTOs/createTask';
import TaskRepository from '../repositories/taskRepository';
import TaskUtils from '../utils/taskUtils';
import IUpdateTask from '../DTOs/updateTask';
import ITaskId from '../DTOs/ITaskId';
import IQuerySearch from '../interface/IQuerySearch';
import APIUtils from '../../utils/APIUtils';
import taskDocument from '../interface/taskDocument';

class TaskService {

  static createTask(createTaskPayload: createTask) {
    const now = TaskUtils.getNowDate();
    createTaskPayload.date_creation = now;

    const result = TaskRepository.createTask(createTaskPayload);
    return result;
  }

  static getAllTasks(userID: string) {
    const result = TaskRepository.getAllTasks(userID);
    return result;
  }

  static async getAllTasksByArray(userID: string, query: IQuerySearch) {
    const queryObject = APIUtils.createQueryObject(query);

    let { success, status, message, result } = await TaskRepository.getAllTasks(userID);

    if (queryObject.category) {
      result = await TaskService.getTaskByCategory(queryObject.category, result);
    }

    if (queryObject.status) {
      result = TaskService.getTaskByStatus(queryObject.status, result);
    }

    return { success, status, message, result };
  }

  static getSingleTask(taskId: ITaskId, userID: string) {
    const result = TaskRepository.getSingleTask(taskId, userID);
    return result;
  }

  static updateTask(taskId: ITaskId, newTaskInfo: IUpdateTask, userID: string) {
    const result = TaskRepository.updateTask(taskId, newTaskInfo, userID);
    return result;
  }

  static deleteTask(taskId: ITaskId, userID: string) {
    const result = TaskRepository.deleteTask(taskId, userID);
    return result;
  }

  static async getTaskByCategory(categoryName: string, taskArray: taskDocument[]): Promise<taskDocument[]> {
    const categoryID = await TaskRepository.getCategoryID(categoryName);
    const filteredArray: taskDocument[] = [];

    taskArray.forEach(element => {
      if (element.categoryID.toString() === categoryID) {
        filteredArray.push(element);
      }
    });

    return filteredArray;
  }

  static getTaskByStatus(status: string, taskArray: taskDocument[]): taskDocument[] {
    const filter = APIUtils.createCustomFilter(status);

    return taskArray.filter(filter);
  }

}

export default TaskService;