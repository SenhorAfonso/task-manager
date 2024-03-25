import UserRepository from '../repositories/userRepository';

class UserService {

  static registerNewUser() {
    const result = UserRepository.registerUser();
    return result;
  }

  static loginUser() {
    const result = UserRepository.loginUser();
    return result;
  }

}

export default UserService;