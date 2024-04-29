import ICreateCategory from '../DTOs/ICreateCategory';
import IUpdateCategory from '../DTOs/IUpdateCategory';
import ICategoryQueryObject from '../interface/ICategoryQueryObject';
import ICategoryQueryPayload from '../interface/ICategoryQueryPayload';
import CategoryRepository from '../repositories/categoryRepository';

class CategoryService {

  static async createCategory(createCategoryPayload: ICreateCategory) {
    const result = await CategoryRepository.createCategory(createCategoryPayload);
    return result;
  }

  static async getAllCategories(userID: string, queryPayload: ICategoryQueryPayload) {
    const queryObject = this.createQueryObject(queryPayload);
    const result = await CategoryRepository.getAllCategories(userID, queryObject);
    return result;
  }

  static async getSingleCategory(categoryID: string, userID: string) {
    const result = await CategoryRepository.getSingleCategory(categoryID, userID);
    return result;
  }

  static async updateCategory(categoryID: string, newCategoryInfo: IUpdateCategory, userID: string) {
    const result = await CategoryRepository.updateCategory(categoryID, newCategoryInfo, userID);
    return result;
  }

  static async deleteCategory(categoryID: string, userID: string) {
    const result = await CategoryRepository.deleteCategory(categoryID, userID);
    return result;
  }

  private static createQueryObject(queryPayload: ICategoryQueryPayload) {
    const defaultLimit = 3;
    const defaultPage = 1;
    const defaultSkip = 0;

    const limit = Number(queryPayload.limit) || defaultLimit;
    const page = Number(queryPayload.page) || defaultPage;
    const sort = queryPayload.sort || 'asc';
    const skip = (page - defaultPage) * limit || Number(queryPayload.skip) || defaultSkip;

    const queryObject: ICategoryQueryObject = {
      limit,
      skip,
      sort,
    };

    if (queryPayload.name) {
      queryObject.name = queryPayload.name;
    }

    if (queryPayload.color) {
      queryObject.color = queryPayload.color;
    }

    return queryObject;
  }

}

export default CategoryService;