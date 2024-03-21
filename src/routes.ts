import express from 'express';

const taskRouter = express.Router();

taskRouter.post('/task', (req, res) => {
  res.send('Create task');
});

taskRouter.get('/task', (req, res) => {
  res.send('Get all tasks');
});

taskRouter.get('/task/:id', (req, res) => {
  res.send('Get task by id');
});

taskRouter.put('/task/:id', (req, res) => {
  res.send('Update task');
});

taskRouter.delete('/task/:id', (req, res) => {
  res.send('Delete task');
});

export default taskRouter;
