import createTask from '../DTOs/createTask';
import TaskRepository from '../repositories/taskRepository';
import TaskUtils from '../utils/taskUtils';
import getSingleTask from '../DTOs/getSingleTask';

class TaskService {

  static createTask(createTaskPayload: createTask) {
    const now = TaskUtils.getNowDate();
    createTaskPayload.date_creation = now;

    const result = TaskRepository.create(createTaskPayload);
    return result;
  }

  static getAllTasks() {
    const result = TaskRepository.getAll();
    return result;
  }

  static getSingleTask(getSingleTaskPayload: getSingleTask) {
    const result = TaskRepository.getById(getSingleTaskPayload);
    return result;
  }

  static updateTask() {
    const result = TaskRepository.update();
    return result;
  }

  static deleteTask() {
    const result = TaskRepository.delete();
    return result;
  }

}

export default TaskService;