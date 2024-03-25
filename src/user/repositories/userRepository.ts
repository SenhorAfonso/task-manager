import StatusCodes from 'http-status-codes';
import userSchema from '../schema/userSchema';

class UserRepository {

  static async registerUser(registerUserPayload: any) {
    const status: number = StatusCodes.OK;
    const message: string = 'User successfully registered!';
    const success: boolean = true;

    const result = await userSchema.create(registerUserPayload);

    return { success, message, status, result };
  }

  static loginUser() {
    return 'user logged in';
  }

}

export default UserRepository;