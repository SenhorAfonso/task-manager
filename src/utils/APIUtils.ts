import IAuthenticatedDocument from '../interface/IAuthenticatedDocument';

class APIUtils {
  static isEmpty(target: any[] | any): boolean {
    if (Array.isArray(target)) {
      return target.length === 0;
    }
    return target === undefined || target === null;
  }

  static userDontOwn(userID: string, target: IAuthenticatedDocument) {
    return target.userID.toString() !== userID;
  }
}

export default APIUtils;