import { StatusCodes } from 'http-status-codes';
import categorySchema from '../schema/categorySchema';
import ICreateCategory from '../DTOs/ICreateCategory';

class CategoryRepository {

  static async createCategory(createCategoryPayload: ICreateCategory) {
    const status: number = StatusCodes.OK;
    const success: boolean = true;
    const message: string = 'Category sucessfully created!';

    const result = await categorySchema.create(createCategoryPayload);

    return { status, success, message, result };
  }

  static getAllCategory() {
    return 'All categories retrieved';
  }

  static getSingleCategory() {
    return 'Single category retrieved';
  }

  static updatecategory() {
    return 'Category updated';
  }

  static deleteCategory() {
    return 'Category deleted';
  }
}

export default CategoryRepository;