import categorySchema from '../category/schema/categorySchema';
import InternalServerError from '../errors/internalServerError';
import NotFoundError from '../errors/notFoundError';
import IAuthenticatedDocument from '../interface/IAuthenticatedDocument';
import IQuerySearch from '../task/interface/IQuerySearch';
import type mongoDocument from '../types/mongoDocument';
import type nullable from '../types/nullable';

class APIUtils {
  static isEmpty(target: any[] | any): boolean {
    if (Array.isArray(target)) {
      return target.length === 0;
    }
    return target === undefined || target === null;
  }

  static userDontOwn(userID: string, target: IAuthenticatedDocument): boolean {
    return target.userID.toString() !== userID;
  }

  static createQueryObject(query: IQuerySearch): IQuerySearch {
    const queryObject: IQuerySearch = {};

    if (query.category) {
      queryObject.category = query.category;
    }

    if (query.taskStatus) {
      queryObject.taskStatus = query.taskStatus;
    }

    if (query.expiration) {
      queryObject.expiration = query.expiration;
    }

    return queryObject;
  }

  static async getCategoryID(name: string): Promise<string> {
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

}

export default APIUtils;