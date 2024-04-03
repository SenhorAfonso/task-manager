import TestUtils from '../../utils/testUtils';
import ValidateUser from '../../../user/validations/validateUser';

describe('Validation payload for users sign-up route.', () => {

  describe('Validate username field and value', () => {

    it('Should return a "username lenght must be at least 5 characters long" error', () => {
      const userPayload = {
        username: 'Pedr',
        weight: 75,
        email: 'pedroafonso@gmail.com',
        password: 'password123',
        confirmPassword: 'password123'
      };

      const error = TestUtils.validateObject(ValidateUser.registerUser(), userPayload).error!.details[0]!;

      expect(error.message).toMatch('"username" length must be at least 5 characters long');
      expect(error.path).toStrictEqual(['username']);
    });

    it('Should return a "username is required" error', () => {
      const userPayload = {
        invalid: 'Pedr',
        weight: 75,
        email: 'pedroafonso@gmail.com',
        password: 'password123',
        confirmPassword: 'password123'
      };

      const error = TestUtils.validateObject(ValidateUser.registerUser(), userPayload).error!.details[0]!;

      expect(error.message).toMatch('"username" is required');
      expect(error.path).toStrictEqual(['username']);
    });

  });

});