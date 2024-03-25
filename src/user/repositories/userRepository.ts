import userSchema from '../schema/userSchema';

class UserRepository {

  static async registerUser(registerUserPayload: any) {
    const result = await userSchema.create(registerUserPayload);
    return result;
  }

  static loginUser() {
    return 'user logged in';
  }

}

export default UserRepository;