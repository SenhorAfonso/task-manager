import StatusCodes from 'http-status-codes';
import mongoose from 'mongoose';
import userSchema from '../schema/userSchema';
import IRegisterNewUser from '../DTOs/IRegisterNewUser';
import BadRequestError from '../../errors/badRequestError';
import UserUtils from '../utils/userUtils';

class UserRepository {

  static async registerUser(registerUserPayload: IRegisterNewUser) {
    const status: number = StatusCodes.OK;
    const message: string = 'User successfully registered!';
    const success: boolean = true;
    const { email, password, confirmPassword } = registerUserPayload;

    let result: mongoose.Document | null;

    result = await userSchema.findOne({ email });

    if (result) {
      throw new BadRequestError('The email entered is already registered!');
    }

    if (!UserUtils.passwordsMatch(password, confirmPassword)) {
      throw new BadRequestError('The passwords do not match');
    }

    result = await userSchema.create(registerUserPayload);

    return { success, message, status, result };
  }

  static loginUser() {
    return 'user logged in';
  }

}

export default UserRepository;