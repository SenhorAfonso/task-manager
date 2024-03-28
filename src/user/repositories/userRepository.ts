import StatusCodes from 'http-status-codes';
import mongoose from 'mongoose';
import userSchema from '../schema/userSchema';
import IRegisterNewUser from '../DTOs/IRegisterNewUser';
import BadRequestError from '../../errors/badRequestError';
import UserUtils from '../utils/userUtils';
import ILoginUser from '../DTOs/ILoginUser';
import APIUtils from '../../utils/APIUtils';
import NotFoundError from '../../errors/notFoundError';
import DuplicatedContentError from '../../errors/duplicatedContentError';

class UserRepository {

  static async registerUser(registerUserPayload: IRegisterNewUser) {
    const status: number = StatusCodes.OK;
    const message: string = 'User successfully registered!';
    const success: boolean = true;
    const { email, password, confirmPassword } = registerUserPayload;

    let result: mongoose.Document | null;

    result = await userSchema.findOne({ email });

    if (result) {
      throw new DuplicatedContentError('The email entered is already registered!');
    }

    if (!UserUtils.passwordsMatch(password, confirmPassword)) {
      throw new BadRequestError('The passwords do not match!');
    }

    result = await userSchema.create(registerUserPayload);

    return { success, message, status, result };
  }

  static async loginUser(loginUserPayload: ILoginUser) {
    const status: number = StatusCodes.OK;
    const message: string = 'User successfully logged in';
    const success: boolean = true;
    const { email, password } = loginUserPayload;

    const user = await userSchema.findOne({ email });

    if(APIUtils.isEmpty(user)) {
      throw new NotFoundError('There is no user with the provided email!');
    }

    const hashedPassword = user!.password!;

    if (UserUtils.passwordIsIncorrect(password, hashedPassword)) {
      throw new BadRequestError('The password is incorrect!');
    }

    return { success, message, status, user };
  }

}

export default UserRepository;