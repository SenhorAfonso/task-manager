import ICreateCategory from '../DTOs/ICreateCategory';
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

  static async getSingleCategory() {
    const result = await CategoryRepository.getSingleCategory();
    return result;
  }

  static async updatecategory() {
    const result = await CategoryRepository.updatecategory();
    return result;
  }

  static async deleteCategory() {
    const result = await CategoryRepository.deleteCategory();
    return result;
  }

}

export default CategoryService;