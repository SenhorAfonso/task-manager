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
import ICategoryQueryObject from '../interface/ICategoryQueryObject';

class CategoryRepository {

  static async createCategory(createCategoryPayload: ICreateCategory) {
    const status: number = StatusCodes.CREATED;
    const success: boolean = true;
    const message: string = 'Category successfully created!';

    const { userID } = createCategoryPayload;
    const { name } = createCategoryPayload;

    let result: Nullable<mongoDocument>;

    try {
      result = await categorySchema.findOne({ userID, name });
    } catch (error) {
      throw new InternalServerError('An internal server error ocurred. Please try again later.');
    }

    if (!APIUtils.isEmpty(result)) {
      throw new DuplicatedContentError('The category already exist!');
    }

    result = await categorySchema.create(createCategoryPayload);

    return { status, success, message, result };
  }

  static async getAllCategories(userID: string, pagination: ICategoryQueryObject) {
    const status: number = StatusCodes.OK;
    const success: boolean = true;
    const message: string = "All user's categories retrieved successfully!";
    let result: Nullable<mongoDocument[]>;

    const { limit, skip, sort, ...filter } = pagination;
    const query = Object.assign(filter, { userID });

    try {
      result = await categorySchema.find(query, null, { sort: { name: sort } })
        .limit(limit)
        .skip(skip);
    } catch (error) {
      throw new InternalServerError('An internal server error ocurred. Please try again later.');
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
        throw new BadRequestError(`The format of the id "${categoryID}" is invalid!`);
      } else {
        throw new InternalServerError('An internal server error ocurred. Please try again later.');
      }
    }

    if (!result) {
      throw new NotFoundError(`The id "${categoryID}" is not associated with any element!`);
    }

    if (APIUtils.userDontOwn(userID, result)) {
      throw new UnauthorizedAccessError('You do not have permissions to access this category!');
    }

    return { status, success, message, result };
  }

  static async updateCategory(categoryID: string, newCategoryInfo: IUpdateCategory, userID: string) {
    const status: number = StatusCodes.OK;
    const success: boolean = true;
    const message: string = 'Category updated successfully!';

    let result: Nullable<IAuthenticatedDocument>;

    try {
      result = await categorySchema.findById({ _id: categoryID });
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        throw new BadRequestError(`The format of the id "${categoryID}" is invalid!`);
      } else {
        throw new InternalServerError('An internal server error ocurred. Please try again later.');
      }
    }

    if (!result) {
      throw new NotFoundError(`The id "${categoryID}" is not associated with any element!`);
    }

    if (APIUtils.userDontOwn(userID, result)) {
      throw new UnauthorizedAccessError('You do not have permissions to update this category!');
    }

    result = await categorySchema.findByIdAndUpdate({ _id: categoryID }, newCategoryInfo, { new: true });

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
        throw new BadRequestError(`The format of the id "${categoryID}" is invalid!`);
      } else {
        throw new InternalServerError('An internal server error ocurred. Please try again later.');
      }
    }

    if (!result) {
      throw new NotFoundError(`The id "${categoryID}" is not associated with any element!`);
    }

    if (APIUtils.userDontOwn(userID, result)) {
      throw new UnauthorizedAccessError('You do not have permissions to delete this category!');
    }

    result = await categorySchema.findByIdAndDelete({ _id: categoryID });

    return { status, success, message, result };
  }
}

export default CategoryRepository;