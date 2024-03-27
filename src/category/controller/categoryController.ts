import { Request, Response } from 'express';
import CategoryService from '../service/categoryService';

class CategoryController {

  static async createCategory(
    req: Request,
    res: Response
  ) {
    const result = await CategoryService.createCategory();
    res.send(result);
  }

  static async getAllCategory(
    req: Request,
    res: Response
  ) {
    const result = await CategoryService.getAllCategory();
    res.send(result);
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