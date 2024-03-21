import createTask from '../DTOs/createTask';

class TaskRepository {

  static create(createTaskPayload: createTask) {
    return createTaskPayload;
  }

  static getAll() {
    return 'Get all';
  }

  static getById() {
    return 'getById';
  }

  static update() {
    return 'update';
  }

  static delete() {
    return 'delete';
  }

}

export default TaskRepository;
