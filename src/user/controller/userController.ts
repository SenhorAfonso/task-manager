import { Request, Response } from 'express';
import UserService from '../service/userService';

class UserController {

  static async register(
    req: Request,
    res: Response
  ) {
    const { username, weight, email, password } = req.body;

    const { success, message, status, result } = await UserService.registerNewUser({ username, weight, email, password });
    res.status(status).json({ success, message, result });
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