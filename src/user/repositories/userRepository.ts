import StatusCodes from 'http-status-codes';
import userSchema from '../schema/userSchema';
import IRegisterNewUser from '../DTOs/IRegisterNewUser';
import BadRequestError from '../../errors/badRequestError';
import UserUtils from '../utils/userUtils';
import ILoginUser from '../DTOs/ILoginUser';
import APIUtils from '../../utils/APIUtils';
import NotFoundError from '../../errors/notFoundError';
import DuplicatedContentError from '../../errors/duplicatedContentError';
import InternalServerError from '../../errors/internalServerError';
import IUserDocument from '../enums/IUserDocument';
import type nullable from '../../types/nullable';
import type mongoDocument from '../../types/mongoDocument';

class UserRepository {

  static async registerUser(registerUserPayload: IRegisterNewUser) {
    const status: number = StatusCodes.CREATED;
    const message: string = 'User successfully registered!';
    const success: boolean = true;
    const { email, password, confirmPassword } = registerUserPayload;

    let result: nullable<mongoDocument>;

    try {
      result = await userSchema.findOne({ email });
    } catch (error) {
      throw new InternalServerError('An internal server error ocurred. Please try again later.');
    }

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

    let user: nullable<IUserDocument>;

    try {
      user = await userSchema.findOne({ email });
    } catch (error) {
      throw new InternalServerError('An internal server error ocurred. Please try again later.');
    }

    if(APIUtils.isEmpty(user)) {
      throw new NotFoundError('There is no user with the provided email!');
    }

    const hashedPassword = user!.password!;

    if (UserUtils.passwordIsIncorrect(password, hashedPassword)) {
      throw new BadRequestError('The email or password is incorrect!');
    }

    return { success, message, status, user };
  }

}

export default UserRepository;