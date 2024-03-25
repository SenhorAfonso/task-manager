class UserUtils {

  static passwordsMatch(password: string, confirmPassword: string) {
    if (password !== confirmPassword) {
      return false;
    }
    return true;
  }

}

export default UserUtils;