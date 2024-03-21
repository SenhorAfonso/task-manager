import { StatusCodes } from 'http-status-codes';
import createTask from '../DTOs/createTask';
import taskSchema from '../schema/taskSchema';

class TaskRepository {

  static async create(createTaskPayload: createTask) {
    const status: number = StatusCodes.CREATED;
    const message: string = 'Task successfully created!';
    const success: boolean = true;

    const result = await taskSchema.create(createTaskPayload);

    return { success, status, message, result };
  }

  static async getAll() {
    const status: number = StatusCodes.OK;
    const message: string = 'All task were retrieved';
    const success: boolean = true;

    const result = await taskSchema.find();

    return { success, status, message, result };
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
