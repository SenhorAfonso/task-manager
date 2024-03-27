import { Request, Response } from 'express';
import CategoryService from '../service/categoryService';

class CategoryController {

  static async createCategory(
    req: Request,
    res: Response
  ) {
    const { name, color } = req.body;
    const { status, success, message, result } = await CategoryService.createCategory({ name, color });
    res.status(status).json({ success, message, result });
  }

  static async getAllCategory(
    req: Request,
    res: Response
  ) {
    const { status, success, message, result } = await CategoryService.getAllCategory();
    res.status(status).json({ success, message, result });
  }

  static async getSingleCategory(
    req: Request,
    res: Response
  ) {
    const { id } = req.params;
    const { status, success, message, result } = await CategoryService.getSingleCategory(id);
    res.status(status).json({ success, message, result });
  }

  static async updatecategory(
    req: Request,
    res: Response
  ) {
    const { id } = req.params;
    const { name, color } = req.body;

    const { status, success, message, result } = await CategoryService.updatecategory(id, { name, color });
    res.status(status).json({ success, message, result });
  }

  static async deleteCategory(
    req: Request,
    res: Response
  ) {
    const { id } = req.params;
    const { status, success, message, result } = await CategoryService.deleteCategory(id);

    res.status(status).json({ success, message, result });
  }

}

export default CategoryController;