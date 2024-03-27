import express from 'express';

const categoryRoute = express.Router();

categoryRoute.post('/category', (req, res) => {
  res.send('Create new category');
});

categoryRoute.get('/category', (req, res) => {
  res.send('Retrieve all category');
});

categoryRoute.get('/category/:id', (req, res) => {
  res.send('Retrieve category by id');
});

categoryRoute.put('/category/:id', (req, res) => {
  res.send('Update category');
});

categoryRoute.delete('/category/:id', (req, res) => {
  res.send('Delete category');
});

export default categoryRoute;