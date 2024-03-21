import createTask from '../DTOs/createTask';
import taskSchema from '../schema/taskSchema';

class TaskRepository {

  static async create(createTaskPayload: createTask) {
    const result = await taskSchema.create(createTaskPayload);
    return result;
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
