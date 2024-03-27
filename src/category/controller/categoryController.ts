import { Response } from 'express';
import CategoryService from '../service/categoryService';
import AuthenticatedRequest from '../../interface/AuthenticatedRequest';

class CategoryController {

  static async createCategory(
    req: AuthenticatedRequest,
    res: Response
  ) {
    const { name, color } = req.body;
    const { userID } = req.user!;

    const { status, success, message, result } = await CategoryService.createCategory({ userID, name, color });
    res.status(status).json({ success, message, result });
  }

  static async getAllCategory(
    req: AuthenticatedRequest,
    res: Response
  ) {
    const { status, success, message, result } = await CategoryService.getAllCategory();
    res.status(status).json({ success, message, result });
  }

  static async getSingleCategory(
    req: AuthenticatedRequest,
    res: Response
  ) {
    const { id } = req.params;
    const { status, success, message, result } = await CategoryService.getSingleCategory(id);
    res.status(status).json({ success, message, result });
  }

  static async updatecategory(
    req: AuthenticatedRequest,
    res: Response
  ) {
    const { id } = req.params;
    const { name, color } = req.body;

    const { status, success, message, result } = await CategoryService.updatecategory(id, { name, color });
    res.status(status).json({ success, message, result });
  }

  static async deleteCategory(
    req: AuthenticatedRequest,
    res: Response
  ) {
    const { id } = req.params;
    const { status, success, message, result } = await CategoryService.deleteCategory(id);

    res.status(status).json({ success, message, result });
  }

}

export default CategoryController;