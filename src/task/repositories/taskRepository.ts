import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import IcreateTask from '../DTOs/createTask';
import taskSchema from '../schema/taskSchema';
import ITaskId from '../DTOs/ITaskId';
import IUpdateTask from '../DTOs/updateTask';
import InternalServerError from '../../errors/internalServerError';
import NotFoundError from '../../errors/notFoundError';
import BadRequestError from '../../errors/badRequestError';
import APIUtils from '../../utils/APIUtils';
import userID from '../DTOs/userID';
import IAuthenticatedDocument from '../../interface/IAuthenticatedDocument';
import categorySchema from '../../category/schema/categorySchema';
import UnauthorizedAccessError from '../../errors/unauthorizedAccessError';

class TaskRepository {

  static async create(createTaskPayload: IcreateTask) {
    const status: number = StatusCodes.CREATED;
    const message: string = 'Task successfully created!';
    const success: boolean = true;
    const { category } = createTaskPayload;

    let result: mongoose.Document | null;
    let categoryDoc: mongoose.Document | null;

    try {
      categoryDoc = await categorySchema.findOne({ name: category });
    } catch (error) {
      throw new InternalServerError('A unknown error ocurred during searching the category by name. Please try again later.');
    }

    if (!categoryDoc) {
      throw new NotFoundError('The category do not exist!');
    }

    const categoryID = categoryDoc.id;
    createTaskPayload.category = categoryID;

    try {
      result = await taskSchema.create(createTaskPayload);
    } catch (error) {
      throw new InternalServerError('A unknown error ocurred during creating a new task. Please try again later.');
    }

    return { success, status, message, result };
  }

  static async getAll(userID: userID) {
    const status: number = StatusCodes.OK;
    const message: string = 'All task were retrieved';
    const success: boolean = true;

    let result: mongoose.Document[] | null;

    try {
      result = await taskSchema.find(userID);
    } catch (error) {
      throw new InternalServerError('A unknown error ocurred during searching for all tasks. Please try again later.');
    }

    if (APIUtils.isEmpty(result)) {
      throw new NotFoundError('The user have no task registered');
    }

    return { success, status, message, result };
  }

  static async getById(taskId: ITaskId, userID: string) {
    const status: number = StatusCodes.OK;
    const message: string = 'Single task were retrieved!';
    const success: boolean = true;

    let result: IAuthenticatedDocument | null;

    try {
      result = await taskSchema.findById(taskId);
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        throw new BadRequestError(`The format of the id ${taskId._id} is invalid!`);
      } else {
        throw new InternalServerError('A unknown error ocurred during searching the task by id. Please try again later.');
      }
    }

    if (!result) {
      throw new NotFoundError(`The id ${taskId._id} is not associated with any element!`);
    }

    if (result.userID !== userID) {
      throw new UnauthorizedAccessError('You do not have permissions to access this task!');
    }

    return { success, status, message, result };
  }

  static async update(taskId: ITaskId, newTaskInfo: IUpdateTask, userID: string) {
    const status: number = StatusCodes.OK;
    const message: string = 'Taks information were updated!';
    const success: boolean = true;

    let result: IAuthenticatedDocument | null;

    try {
      result = await taskSchema.findOne(taskId);
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        throw new BadRequestError(`The format of the id ${taskId._id} is invalid!`);
      } else {
        throw new InternalServerError('A unknown error ocurred during searching the task by id to update. Please try again later.');
      }
    }

    if (!result) {
      throw new NotFoundError(`The id ${taskId._id} is not associated with any element!`);
    }

    if (APIUtils.userDontOwn(userID, result)) {
      throw new UnauthorizedAccessError('You do not have permissions to update this task!');
    }

    result = await taskSchema.findByIdAndUpdate(taskId, newTaskInfo, { new: true });

    return { success, status, message, result };
  }

  static async delete(taskId: ITaskId, userID: string) {
    const status: number = StatusCodes.OK;
    const message: string = 'Task were succesfully deleted!';
    const success: boolean = true;

    let result: IAuthenticatedDocument | null;

    try {
      result = await taskSchema.findById(taskId);
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        throw new BadRequestError(`The format of the id ${taskId._id} is invalid!`);
      } else {
        throw new InternalServerError('A unknown error ocurred during searching the category by id to delete. Please try again later.');
      }
    }

    if (!result) {
      throw new NotFoundError(`The id ${taskId._id} is not associated with any element!`);
    }

    if (APIUtils.userDontOwn(userID, result)) {
      throw new UnauthorizedAccessError('You do not have permissions to delete this task!');
    }

    await taskSchema.findByIdAndDelete(taskId);

    return { success, status, message, result };
  }

}

export default TaskRepository;
