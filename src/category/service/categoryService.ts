import ICreateCategory from '../DTOs/ICreateCategory';
import IUpdateCategory from '../DTOs/IUpdateCategory';
import CategoryRepository from '../repositories/categoryRepository';

class CategoryService {

  static async createCategory(createCategoryPayload: ICreateCategory) {
    const result = await CategoryRepository.createCategory(createCategoryPayload);
    return result;
  }

  static async getAllCategory() {
    const result = await CategoryRepository.getAllCategory();
    return result;
  }

  static async getSingleCategory(categoryID: string) {
    const result = await CategoryRepository.getSingleCategory(categoryID);
    return result;
  }

  static async updatecategory(categoryID: string, newCategoryInfo: IUpdateCategory) {
    const result = await CategoryRepository.updatecategory(categoryID, newCategoryInfo);
    return result;
  }

  static async deleteCategory(categoryID: string) {
    const result = await CategoryRepository.deleteCategory(categoryID);
    return result;
  }

}

export default CategoryService;