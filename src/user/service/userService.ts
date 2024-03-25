import UserRepository from '../repositories/userRepository';

class UserService {

  static registerNewUser(registerUserPayload: any) {
    const result = UserRepository.registerUser(registerUserPayload);
    return result;
  }

  static loginUser() {
    const result = UserRepository.loginUser();
    return result;
  }

}

export default UserService;