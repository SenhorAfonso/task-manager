import express from 'express';

const userRouter = express.Router();

userRouter.post('/user/signup', (req, res) => {
  res.send('Signup');
});

userRouter.post('/user/login', (req, res) => {
  res.send('Login');
});

export default userRouter;