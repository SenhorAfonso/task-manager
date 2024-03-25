import { Request, Response } from 'express';
import UserService from '../service/userService';

class UserController {

  static register(
    req: Request,
    res: Response
  ) {
    const result = UserService.registerNewUser();
    res.send(result);
  }

  static login(
    req: Request,
    res: Response
  ) {
    const result = UserService.loginUser();
    res.send(result);
  }

}

export default UserController;