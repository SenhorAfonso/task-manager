import ICreateCategory from '../DTOs/ICreateCategory';
import IUpdateCategory from '../DTOs/IUpdateCategory';
import CategoryRepository from '../repositories/categoryRepository';

class CategoryService {

  static async createCategory(createCategoryPayload: ICreateCategory) {
    const result = await CategoryRepository.createCategory(createCategoryPayload);
    return result;
  }

  static async getAllCategory(userID: string) {
    const result = await CategoryRepository.getAllCategory(userID);
    return result;
  }

  static async getSingleCategory(categoryID: string, userID: string) {
    const result = await CategoryRepository.getSingleCategory(categoryID, userID);
    return result;
  }

  static async updatecategory(categoryID: string, newCategoryInfo: IUpdateCategory, userID: string) {
    const result = await CategoryRepository.updatecategory(categoryID, newCategoryInfo, userID);
    return result;
  }

  static async deleteCategory(categoryID: string, userID: string) {
    const result = await CategoryRepository.deleteCategory(categoryID, userID);
    return result;
  }

}

export default CategoryService;