import jwt from 'jsonwebtoken';
import IRegisterNewUser from '../DTOs/IRegisterNewUser';
import UserRepository from '../repositories/userRepository';
import ILoginUser from '../DTOs/ILoginUser';
import serverConfig from '../../config/config';

class UserService {

  static registerNewUser(registerUserPayload: IRegisterNewUser) {
    const result = UserRepository.registerUser(registerUserPayload);
    return result;
  }

  static async loginUser(loginUser: ILoginUser) {
    const { success, message, status, user } = await UserRepository.loginUser(loginUser);
    const userID = user!.id;
    const token = jwt.sign({ userID }, serverConfig.JWT_SECRETE_KEY!);

    return { success, message, status, user, token };
  }

}

export default UserService;