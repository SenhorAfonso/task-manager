import IAuthenticatedDocument from '../interface/IAuthenticatedDocument';
import IQuerySearch from '../task/interface/IQuerySearch';
import ITaskQueryObject from '../task/interface/ITaskQueryObject';
import ITaskQueryPayload from '../task/interface/ITaskQueryPayload';
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

  static createTaskQueryObject(queryPayload: ITaskQueryPayload) {
    const defaultLimit = 3;
    const defaultPage = 1;
    const defaultSkip = 0;

    const limit = Number(queryPayload.limit) || defaultLimit;
    const page = Number(queryPayload.page) || defaultPage;
    const sort = queryPayload.sort || 'asc';
    const skip = (page - defaultPage) * limit || Number(queryPayload.skip) || defaultSkip;

    const queryObject: ITaskQueryObject = {
      limit,
      skip,
      sort,
    };

    return queryObject;
  }

  static createTaskArrayQueryObject(query: IQuerySearch): IQuerySearch {
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