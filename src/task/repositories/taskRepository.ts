import { StatusCodes } from 'http-status-codes';
import IcreateTask from '../DTOs/createTask';
import taskSchema from '../schema/taskSchema';
import IgetSingleTask from '../DTOs/getSingleTask';

class TaskRepository {

  static async create(createTaskPayload: IcreateTask) {
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

  static async getById(getSingleTask: IgetSingleTask) {
    const status: number = StatusCodes.OK;
    const message: string = 'Single task were retrieved!';
    const success: boolean = true;

    const result = await taskSchema.findById({ _id: getSingleTask.taskId });

    return { success, status, message, result };
  }

  static update() {
    return 'update';
  }

  static delete() {
    return 'delete';
  }

}

export default TaskRepository;
