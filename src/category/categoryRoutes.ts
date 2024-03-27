import express from 'express';
import CategoryController from './controller/categoryController';
import ValidationMiddleware from '../middleware/ValidationMiddleware';
import ValidateCategory from './validations/validateCategory';

const categoryRoute = express.Router();

categoryRoute.post('/category', [
  ValidationMiddleware.ValidatePayload(ValidateCategory.createCategory(), 'body')
], CategoryController.createCategory);

categoryRoute.get('/category', CategoryController.getAllCategory);

categoryRoute.get('/category/:id', CategoryController.getSingleCategory);

categoryRoute.put('/category/:id', CategoryController.updatecategory);

categoryRoute.delete('/category/:id', [
  ValidationMiddleware.ValidatePayload(ValidateCategory.updateCategory(), 'body')
], CategoryController.deleteCategory);

export default categoryRoute;