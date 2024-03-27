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
    const message: string = "All user's categories retrieved successfully!";

    const result = await categorySchema.find();

    return { status, success, message, result };
  }

  static async getSingleCategory(categoryID: string) {
    const status: number = StatusCodes.OK;
    const success: boolean = true;
    const message: string = 'Category retrieved successfully!';

    const result = await categorySchema.findById({ _id: categoryID });

    return { status, success, message, result };
  }

  static updatecategory() {
    return 'Category updated';
  }

  static deleteCategory() {
    return 'Category deleted';
  }
}

export default CategoryRepository;