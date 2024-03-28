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
import DuplicatedContentError from '../../errors/duplicatedContentError';
import UnauthorizedAccessError from '../../errors/unauthorizedAccessError';
import type Nullable from '../../types/nullable';
import type mongoDocument from '../../types/mongoDocument';

class CategoryRepository {

  static async createCategory(createCategoryPayload: ICreateCategory) {
    const status: number = StatusCodes.OK;
    const success: boolean = true;
    const message: string = 'Category sucessfully created!';

    const { userID } = createCategoryPayload;
    const { name } = createCategoryPayload;

    let result: Nullable<mongoDocument>;

    try {
      result = await categorySchema.findOne({ userID, name });
    } catch (error) {
      throw new InternalServerError('An unknown error ocurred during duplicated category name verification. Please try again later.');
    }

    if (!APIUtils.isEmpty(result)) {
      throw new DuplicatedContentError('The category already exist!');
    }

    try {
      result = await categorySchema.create(createCategoryPayload);
    } catch (error) {
      throw new InternalServerError('A unknown error ocurred during category creation. Please try again later.');
    }

    return { status, success, message, result };
  }

  static async getAllCategory(userID: string) {
    const status: number = StatusCodes.OK;
    const success: boolean = true;
    const message: string = "All user's categories retrieved successfully!";

    let result: Nullable<mongoDocument[]>;

    try {
      result = await categorySchema.find({ userID });
    } catch (error) {
      throw new InternalServerError('A unknown error ocurred during searching for all categories. Please try again later.');
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

    let result: Nullable<IAuthenticatedDocument>;

    try {
      result = await categorySchema.findById({ _id: categoryID });
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        throw new BadRequestError(`The format of the id ${categoryID} is invalid!`);
      } else {
        throw new InternalServerError('A unknown error ocurred during searching the category by id. Please try again later.');
      }
    }

    if (!result) {
      throw new NotFoundError(`The id ${categoryID} is not associated with any element!`);
    }

    if (APIUtils.userDontOwn(userID, result)) {
      throw new UnauthorizedAccessError('You do not have permissions to access this category!');
    }

    return { status, success, message, result };
  }

  static async updatecategory(categoryID: string, newCategoryInfo: IUpdateCategory, userID: string) {
    const status: number = StatusCodes.OK;
    const success: boolean = true;
    const message: string = 'Category updated successfully!';

    let result: Nullable<IAuthenticatedDocument>;

    try {
      result = await categorySchema.findById({ _id: categoryID });
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        throw new BadRequestError(`The format of the id ${categoryID} is invalid!`);
      } else {
        throw new InternalServerError('A unknown error ocurred during searching the category by id to update. Please try again later.');
      }
    }

    if (!result) {
      throw new NotFoundError(`The id ${categoryID} is not associated with any element!`);
    }

    if (APIUtils.userDontOwn(userID, result)) {
      throw new UnauthorizedAccessError('You do not have permissions to update this category!');
    }

    try {
      result = await categorySchema.findByIdAndUpdate({ _id: categoryID }, newCategoryInfo, { new: true });
    } catch (error) {
      throw new InternalServerError('An unknown error ocurred during category update. Please try again later.');
    }

    return { status, success, message, result };
  }

  static async deleteCategory(categoryID: string, userID: string) {
    const status: number = StatusCodes.OK;
    const success: boolean = true;
    const message: string = 'Category deleted successfully!';

    let result: Nullable<IAuthenticatedDocument>;

    try {
      result = await categorySchema.findById({ _id: categoryID });
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        throw new BadRequestError(`The format of the id ${categoryID} is invalid!`);
      } else {
        throw new InternalServerError('A unknown error ocurred during searching the category by id to delete. Please try again later.');
      }
    }

    if (!result) {
      throw new NotFoundError(`The id ${categoryID} is not associated with any element!`);
    }

    if (APIUtils.userDontOwn(userID, result)) {
      throw new UnauthorizedAccessError('You do not have permissions to delete this category!');
    }

    try {
      result = await categorySchema.findByIdAndDelete({ _id: categoryID });
    } catch (error) {
      throw new InternalServerError('An unknown error ocurred during category delete. Please try again later.');
    }

    return { status, success, message, result };
  }
}

export default CategoryRepository;