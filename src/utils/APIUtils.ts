import IAuthenticatedDocument from '../interface/IAuthenticatedDocument';
import IQuerySearch from '../task/interface/IQuerySearch';
import taskDocument from '../task/interface/taskDocument';

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

    if (query.status) {
      queryObject.status = query.status;
    }

    if (query.conclusion) {
      queryObject.conclusion = query.conclusion;
    }

    return queryObject;
  }

  static createCustomFilter(status: string) {
    return function filter(task: taskDocument) {
      return task.status === status;
    };
  }

}

export default APIUtils;