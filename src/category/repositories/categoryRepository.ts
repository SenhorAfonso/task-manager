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

  static async getAllCategory() {
    const status: number = StatusCodes.OK;
    const success: boolean = true;
    const message: string = "All user's categories retrieved";

    const result = await categorySchema.find();

    return { status, success, message, result };
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