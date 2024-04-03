import express from 'express';
import CategoryController from './controller/categoryController';
import ValidationMiddleware from '../middleware/ValidationMiddleware';
import ValidateCategory from './validations/validateCategory';
import AuthenticationMiddleware from '../middleware/AuthenticationMiddleware';

const categoryRoute = express.Router();

categoryRoute.post('/category', [
  AuthenticationMiddleware.AuthenticateToken,
  ValidationMiddleware.ValidatePayload(ValidateCategory.createCategory(), 'body')
], CategoryController.createCategory);

categoryRoute.get('/category', [
  AuthenticationMiddleware.AuthenticateToken,
], CategoryController.getAllCategory);

categoryRoute.get('/category/:id', [
  AuthenticationMiddleware.AuthenticateToken
], CategoryController.getSingleCategory);

categoryRoute.put('/category/:id', [
  AuthenticationMiddleware.AuthenticateToken,
  ValidationMiddleware.ValidatePayload(ValidateCategory.createCategory(), 'body')
], CategoryController.updateCategory);

categoryRoute.delete('/category/:id', [
  AuthenticationMiddleware.AuthenticateToken
], CategoryController.deleteCategory);

export default categoryRoute;