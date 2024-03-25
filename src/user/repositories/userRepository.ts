import StatusCodes from 'http-status-codes';
import userSchema from '../schema/userSchema';
import mongoose from 'mongoose';
import IRegisterNewUser from '../DTOs/IRegisterNewUser';
import BadRequestError from '../../errors/badRequestError';

class UserRepository {

  static async registerUser(registerUserPayload: IRegisterNewUser) {
    const status: number = StatusCodes.OK;
    const message: string = 'User successfully registered!';
    const success: boolean = true;
    const { email } = registerUserPayload;

    let result: mongoose.Document | null;

    result = await userSchema.findOne({ email });

    if (result) {
      throw new BadRequestError('The email entered is already registered!');
    }

    result = await userSchema.create(registerUserPayload);

    return { success, message, status, result };
  }

  static loginUser() {
    return 'user logged in';
  }

}

export default UserRepository;