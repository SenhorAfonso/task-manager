import createTask from '../DTOs/createTask';
import TaskRepository from '../repositories/taskRepository';
import TaskUtils from '../utils/taskUtils';
import IUpdateTask from '../DTOs/updateTask';
import ITaskId from '../DTOs/ITaskId';
import IQuerySearch from '../interface/IQuerySearch';
import APIUtils from '../../utils/APIUtils';

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

  static getAllTasksByArray(userID: string, query: IQuerySearch) {
    const queryObject = APIUtils.createQueryObject(query);
    const result = TaskRepository.getAllTasksByArray(userID, queryObject);
    return result;
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

}

export default TaskService;