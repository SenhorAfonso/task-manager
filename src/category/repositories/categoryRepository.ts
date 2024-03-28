import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import categorySchema from '../schema/categorySchema';
import ICreateCategory from '../DTOs/ICreateCategory';
import IUpdateCategory from '../DTOs/IUpdateCategory';
import InternalServerError from '../../errors/internalServerError';
import APIUtils from '../../utils/APIUtils';
import NotFoundError from '../../errors/notFoundError';
import BadRequestError from '../../errors/badRequestError';
import IAuthenticatedDocument from '../../interface/IAuthenticatedDocument';

class CategoryRepository {

  static async createCategory(createCategoryPayload: ICreateCategory) {
    const status: number = StatusCodes.OK;
    const success: boolean = true;
    const message: string = 'Category sucessfully created!';

    const { userID } = createCategoryPayload;
    const { name } = createCategoryPayload;

    let result: mongoose.Document | null;

    result = await categorySchema.findOne({ userID, name });
    if (!APIUtils.isEmpty(result)) {
      throw new BadRequestError('The category already exist!');
    }

    try {
      result = await categorySchema.create(createCategoryPayload);
    } catch (error) {
      throw new InternalServerError();
    }

    return { status, success, message, result };
  }

  static async getAllCategory(userID: string) {
    const status: number = StatusCodes.OK;
    const success: boolean = true;
    const message: string = "All user's categories retrieved successfully!";

    let result: mongoose.Document[] | null;

    try {
      result = await categorySchema.find({ userID });
    } catch (error) {
      throw new InternalServerError();
    }

    if (APIUtils.isEmpty(result)) {
      throw new NotFoundError('There is no category registered!');
    }

    return { status, success, message, result };
  }

  static async getSingleCategory(categoryID: string, userID: string) {
    const status: number = StatusCodes.OK;
    const success: boolean = true;
    const message: string = 'Category retrieved successfully!';

    let result: IAuthenticatedDocument | null;

    try {
      result = await categorySchema.findById({ _id: categoryID });
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        throw new BadRequestError(`The format of the id ${categoryID} is invalid!`);
      } else {
        throw new InternalServerError();
      }
    }

    if (!result) {
      throw new NotFoundError(`The id ${categoryID} is not associated with any element!`);
    }

    if (APIUtils.userDontOwn(userID, result)) {
      throw new Error('Unauthorized access!');
    }

    return { status, success, message, result };
  }

  static async updatecategory(categoryID: string, newCategoryInfo: IUpdateCategory, userID: string) {
    const status: number = StatusCodes.OK;
    const success: boolean = true;
    const message: string = 'Category updated successfully!';

    let result: IAuthenticatedDocument | null;

    try {
      result = await categorySchema.findById({ _id: categoryID });
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        throw new BadRequestError();
      } else {
        throw new InternalServerError();
      }
    }

    if (!result) {
      throw new NotFoundError(`The id ${categoryID} is not associated with any element!`);
    }

    if (APIUtils.userDontOwn(userID, result)) {
      throw new NotFoundError(`The id ${categoryID} is not associated with any element!`);
    }

    await categorySchema.findByIdAndUpdate({ _id: categoryID }, newCategoryInfo, { new: true });

    return { status, success, message, result };
  }

  static async deleteCategory(categoryID: string, userID: string) {
    const status: number = StatusCodes.OK;
    const success: boolean = true;
    const message: string = 'Category deleted successfully!';

    let result: IAuthenticatedDocument | null;

    try {
      result = await categorySchema.findById({ _id: categoryID });
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        throw new BadRequestError();
      } else {
        throw new InternalServerError();
      }
    }

    if (!result) {
      throw new NotFoundError(`The id ${categoryID} is not associated with any element!`);
    }

    if (APIUtils.userDontOwn(userID, result)) {
      throw new Error('Unauthorized access!');
    }

    result = await categorySchema.findByIdAndDelete({ _id: categoryID });

    return { status, success, message, result };
  }
}

export default CategoryRepository;