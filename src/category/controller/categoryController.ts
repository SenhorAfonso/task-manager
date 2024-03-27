import { Request, Response } from 'express';
import CategoryService from '../service/categoryService';

class CategoryController {

  static async createCategory(
    req: Request,
    res: Response
  ) {
    const { name, color } = req.body;
    const result = await CategoryService.createCategory({ name, color });
    res.send(result);
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
    const result = await CategoryService.getSingleCategory();
    res.send(result);
  }

  static async updatecategory(
    req: Request,
    res: Response
  ) {
    const result = await CategoryService.updatecategory();
    res.send(result);
  }

  static async deleteCategory(
    req: Request,
    res: Response
  ) {
    const result = await CategoryService.deleteCategory();
    res.send(result);
  }

}

export default CategoryController;