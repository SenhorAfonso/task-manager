import bcrypt from 'bcryptjs';

class UserUtils {

  static passwordsMatch(password: string, confirmPassword: string) {
    if (password !== confirmPassword) {
      return false;
    }
    return true;
  }

  static passwordIsIncorrect(password: string, hashedPassword: string) {
    const check = bcrypt.compareSync(password, hashedPassword);
    return !check;
  }

}

export default UserUtils;