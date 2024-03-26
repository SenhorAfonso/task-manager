import createTask from '../DTOs/createTask';
import TaskRepository from '../repositories/taskRepository';
import TaskUtils from '../utils/taskUtils';
import IUpdateTask from '../DTOs/updateTask';
import ITaskId from '../DTOs/ITaskId';
import userID from '../DTOs/userID';

class TaskService {

  static createTask(createTaskPayload: createTask) {
    const now = TaskUtils.getNowDate();
    createTaskPayload.date_creation = now;

    const result = TaskRepository.create(createTaskPayload);
    return result;
  }

  static getAllTasks(userID: userID) {
    const result = TaskRepository.getAll(userID);
    return result;
  }

  static getSingleTask(taskId: ITaskId) {
    const result = TaskRepository.getById(taskId);
    return result;
  }

  static updateTask(taskId: ITaskId, newTaskInfo: IUpdateTask) {
    const result = TaskRepository.update(taskId, newTaskInfo);
    return result;
  }

  static deleteTask(taskId: ITaskId) {
    const result = TaskRepository.delete(taskId);
    return result;
  }

}

export default TaskService;