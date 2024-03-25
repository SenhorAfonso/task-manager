import { Request, Response } from 'express';

class UserController {

  static register(
    req: Request,
    res: Response
  ) {
    res.send('register');
  }

  static login(
    req: Request,
    res: Response
  ) {
    res.send('login');
  }

}

export default UserController;