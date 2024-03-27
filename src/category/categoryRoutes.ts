import express from 'express';
import CategoryController from './controller/categoryController';

const categoryRoute = express.Router();

categoryRoute.post('/category', CategoryController.createCategory);

categoryRoute.get('/category', CategoryController.getAllCategory);

categoryRoute.get('/category/:id', CategoryController.getSingleCategory);

categoryRoute.put('/category/:id', CategoryController.updatecategory);

categoryRoute.delete('/category/:id', CategoryController.deleteCategory);

export default categoryRoute;