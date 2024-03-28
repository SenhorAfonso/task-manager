import ICreateCategory from '../DTOs/ICreateCategory';
import IUpdateCategory from '../DTOs/IUpdateCategory';
import CategoryRepository from '../repositories/categoryRepository';

class CategoryService {

  static async createCategory(createCategoryPayload: ICreateCategory) {
    const result = await CategoryRepository.createCategory(createCategoryPayload);
    return result;
  }

  static async getAllCategories(userID: string) {
    const result = await CategoryRepository.getAllCategories(userID);
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

}

export default CategoryService;