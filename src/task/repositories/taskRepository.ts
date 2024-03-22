import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import IcreateTask from '../DTOs/createTask';
import taskSchema from '../schema/taskSchema';
import IgetSingleTask from '../DTOs/getSingleTask';
import ITaskId from '../DTOs/ITaskId';
import IUpdateTask from '../DTOs/updateTask';
import InternalServerError from '../../errors/internalServerError';
import NotFoundError from '../../errors/notFoundError';

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

    if (result.length === 0) {
      throw new NotFoundError();
    }

    return { success, status, message, result };
  }

  static async getById(getSingleTask: IgetSingleTask) {
    const status: number = StatusCodes.OK;
    const message: string = 'Single task were retrieved!';
    const success: boolean = true;

    const result = await taskSchema.findById({ _id: getSingleTask.taskId });

    return { success, status, message, result };
  }

  static async update(taskId: ITaskId, newTaskInfo: IUpdateTask) {
    const status: number = StatusCodes.OK;
    const message: string = 'Taks information were updated!';
    const success: boolean = true;

    const result = await taskSchema.findByIdAndUpdate(taskId, newTaskInfo, { new: true });
    return { success, status, message, result };
  }

  static async delete(taskId: ITaskId) {
    const status: number = StatusCodes.OK;
    const message: string = 'Task were succesfully deleted!';
    const success: boolean = true;

    const result = await taskSchema.findByIdAndDelete(taskId);
    return { success, status, message, result };
  }

}

export default TaskRepository;
