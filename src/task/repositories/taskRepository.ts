import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import IcreateTask from '../DTOs/createTask';
import taskSchema from '../schema/taskSchema';
import ITaskId from '../DTOs/ITaskId';
import IUpdateTask from '../DTOs/updateTask';
import InternalServerError from '../../errors/internalServerError';
import NotFoundError from '../../errors/notFoundError';
import BadRequestError from '../../errors/badRequestError';
import TaskUtils from '../utils/taskUtils';

class TaskRepository {

  static async create(createTaskPayload: IcreateTask) {
    const status: number = StatusCodes.CREATED;
    const message: string = 'Task successfully created!';
    const success: boolean = true;

    let result: mongoose.Document | null;

    try {
      result = await taskSchema.create(createTaskPayload);
    } catch (error) {
      throw new InternalServerError();
    }

    return { success, status, message, result };
  }

  static async getAll() {
    const status: number = StatusCodes.OK;
    const message: string = 'All task were retrieved';
    const success: boolean = true;

    let result: mongoose.Document[] | null;

    try {
      result = await taskSchema.find();
    } catch (error) {
      throw new InternalServerError();
    }

    if (TaskUtils.isEmpty(result)) {
      throw new NotFoundError();
    }

    return { success, status, message, result };
  }

  static async getById(taskId: ITaskId) {
    const status: number = StatusCodes.OK;
    const message: string = 'Single task were retrieved!';
    const success: boolean = true;

    let result: mongoose.Document | null;

    try {
      result = await taskSchema.findById(taskId);
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        throw new BadRequestError(`The format of the id ${taskId._id} is invalid!`);
      } else {
        throw new InternalServerError();
      }
    }

    if (!result) {
      throw new NotFoundError(`The id ${taskId._id} is not associated with any element!`);
    }

    return { success, status, message, result };
  }

  static async update(taskId: ITaskId, newTaskInfo: IUpdateTask) {
    const status: number = StatusCodes.OK;
    const message: string = 'Taks information were updated!';
    const success: boolean = true;

    let result: mongoose.Document | null;

    try {
      result = await taskSchema.findByIdAndUpdate(taskId, newTaskInfo, { new: true });
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        throw new BadRequestError(`The format of the id ${taskId._id} is invalid!`);
      } else {
        throw new InternalServerError();
      }
    }

    if (!result) {
      throw new NotFoundError(`The id ${taskId._id} is not associated with any element!`);
    }

    return { success, status, message, result };
  }

  static async delete(taskId: ITaskId) {
    const status: number = StatusCodes.OK;
    const message: string = 'Task were succesfully deleted!';
    const success: boolean = true;

    let result: mongoose.Document | null;

    try {
      result = await taskSchema.findByIdAndDelete(taskId);
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        throw new BadRequestError(`The format of the id ${taskId._id} is invalid!`);
      } else {
        throw new InternalServerError();
      }
    }

    if (!result) {
      throw new NotFoundError(`The id ${taskId._id} is not associated with any element!`);
    }

    return { success, status, message, result };
  }

}

export default TaskRepository;
