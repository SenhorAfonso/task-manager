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
import IAuthenticatedDocument from '../../interface/IAuthenticatedDocument';
import categorySchema from '../../category/schema/categorySchema';
import UnauthorizedAccessError from '../../errors/unauthorizedAccessError';
import type nullable from '../../types/nullable';
import type mongoDocument from '../../types/mongoDocument';
import taskDocument from '../interface/taskDocument';

class TaskRepository {

  static async createTask(createTaskPayload: IcreateTask) {
    const status: number = StatusCodes.CREATED;
    const message: string = 'Task successfully created!';
    const success: boolean = true;
    const { category } = createTaskPayload;

    let result: nullable<mongoDocument>;
    let categoryDoc: nullable<mongoDocument>;

    try {
      categoryDoc = await categorySchema.findOne({ name: category });
    } catch (error) {
      throw new InternalServerError('A unknown error ocurred during searching the category by name. Please try again later.');
    }

    if (!categoryDoc) {
      throw new NotFoundError('The category do not exist!');
    }

    const categoryID = categoryDoc.id;
    createTaskPayload.categoryID = categoryID;

    try {
      result = await taskSchema.create(createTaskPayload);
    } catch (error) {
      throw new InternalServerError('A unknown error ocurred during creating a new task. Please try again later.');
    }

    return { success, status, message, result };
  }

  static async getAllTasks(userID: string) {
    const status: number = StatusCodes.OK;
    const message: string = 'All task were retrieved!';
    const success: boolean = true;

    let result: nullable<taskDocument[]>;

    try {
      result = await taskSchema.find({ userID });
    } catch (error) {
      throw new InternalServerError('A unknown error ocurred during searching for all tasks. Please try again later.');
    }

    if (APIUtils.isEmpty(result)) {
      throw new NotFoundError('The user have no task registered!');
    }
    return { success, status, message, result };
  }

  static async getCategoryID(name: string): Promise<string|undefined> {
    if (!name) {
      return;
    }

    let categoryDoc: nullable<mongoDocument>;

    try {
      categoryDoc = await categorySchema.findOne({ name });
    } catch (error) {
      throw new InternalServerError('A unknown error ocurred during searching for category name. Please try again later.');
    }

    if (APIUtils.isEmpty(categoryDoc)) {
      throw new NotFoundError(`The category ${name} does not exist!`);
    }

    return categoryDoc!.id;
  }

  static async getSingleTask(taskId: ITaskId, userID: string) {
    const status: number = StatusCodes.OK;
    const message: string = 'Single task were retrieved!';
    const success: boolean = true;

    let result: nullable<IAuthenticatedDocument>;

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

    if (APIUtils.userDontOwn(userID, result)) {
      throw new UnauthorizedAccessError('You do not have permissions to access this task!');
    }

    return { success, status, message, result };
  }

  static async updateTask(taskId: ITaskId, newTaskInfo: IUpdateTask, userID: string) {
    const status: number = StatusCodes.OK;
    const message: string = 'Task information were updated!';
    const success: boolean = true;
    const { category } = newTaskInfo;

    let result: nullable<IAuthenticatedDocument>;
    let categoryDoc: nullable<mongoDocument>;

    try {
      categoryDoc = await categorySchema.findOne({ name: category });
    } catch (error) {
      throw new InternalServerError();
    }

    if (APIUtils.isEmpty(categoryDoc)) {
      throw new NotFoundError(`The category "${newTaskInfo.category}" is not registered!`);
    }

    const categoryID = categoryDoc!.id;
    newTaskInfo.category = categoryID;

    try {
      result = await taskSchema.findOne(taskId);
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        throw new BadRequestError(`The format of the id "${taskId._id}" is invalid!`);
      } else {
        throw new InternalServerError('A unknown error ocurred during searching the task by id to update. Please try again later.');
      }
    }

    if (!result) {
      throw new NotFoundError(`The id "${taskId._id}" is not associated with any element!`);
    }

    if (APIUtils.userDontOwn(userID, result)) {
      throw new UnauthorizedAccessError('You do not have permissions to update this task!');
    }

    try {
      result = await taskSchema.findByIdAndUpdate(taskId, newTaskInfo, { new: true });
    } catch (error) {
      throw new InternalServerError('A unknown error ocurred during task update. Please try again later');
    }

    return { success, status, message, result };
  }

  static async deleteTask(taskId: ITaskId, userID: string) {
    const status: number = StatusCodes.OK;
    const message: string = 'Task were succesfully deleted!';
    const success: boolean = true;

    let result: nullable<IAuthenticatedDocument>;

    try {
      result = await taskSchema.findById(taskId);
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        throw new BadRequestError(`The format of the id "${taskId._id}" is invalid!`);
      } else {
        throw new InternalServerError('A unknown error ocurred during searching the category by id to delete. Please try again later.');
      }
    }

    if (!result) {
      throw new NotFoundError(`The id "${taskId._id}" is not associated with any element!`);
    }

    if (APIUtils.userDontOwn(userID, result)) {
      throw new UnauthorizedAccessError('You do not have permissions to delete this task!');
    }

    try {
      await taskSchema.findByIdAndDelete(taskId);
    } catch (error) {
      throw new InternalServerError('A unknown error ocurred during task delete. Please try again later');
    }

    return { success, status, message, result };
  }

  static async aggregateTaskByCategory(userID: string) {
    const status: number = StatusCodes.OK;
    const message: string = 'All task were retrieved';
    const success: boolean = true;

    const result = await taskSchema.aggregate([
      {
        $match: {
          userID: new mongoose.Types.ObjectId(userID)
        }
      },
      {
        $lookup: {
          from: 'categorymodels',
          localField: 'categoryID',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $unwind: '$category'
      },
      {
        $addFields: {
          categoryName: '$category.name'
        }
      },
      {
        $group: {
          _id: '$categoryID',
          tasks: { $push: '$$ROOT' }
        }
      }
    ]);

    return { success, status, message, result };
  }

}

export default TaskRepository;
