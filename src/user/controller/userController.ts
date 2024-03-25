import { Request, Response } from 'express';
import UserService from '../service/userService';

class UserController {

  static async register(
    req: Request,
    res: Response
  ) {
    const { username, weight, email, password, confirmPassword } = req.body;

    const { success, message, status, result } = await UserService.registerNewUser({ username, weight, email, password, confirmPassword });
    res.status(status).json({ success, message, result });
  }

  static async login(
    req: Request,
    res: Response
  ) {
    const { email, password } = req.body;
    const { success, message, status, user, token } = await UserService.loginUser({ email, password });

    res.status(status).json({ success, message, data: { user, token } });;
  }

}

export default UserController;