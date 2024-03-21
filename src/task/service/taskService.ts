import createTask from '../DTOs/createTask';
import TaskRepository from '../repositories/taskRepository';

class TaskService {

  static createTask(createTaskPayload: createTask) {
    const result = TaskRepository.create(createTaskPayload);
    return result;
  }

  static getAllTasks() {
    const result = TaskRepository.getAll();
    return result;
  }

  static getSingleTask() {
    const result = TaskRepository.getById();
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