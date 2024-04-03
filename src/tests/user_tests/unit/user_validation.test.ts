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

  describe('Validate weight field and value', () => {

    it('Should return a "weight must be greater than or equal to 1" error', () => {
      const userPayload = {
        username: 'Pedro',
        weight: 0,
        email: 'pedroafonso@gmail.com',
        password: 'password123',
        confirmPassword: 'password123'
      };

      const error = TestUtils.validateObject(ValidateUser.registerUser(), userPayload).error!.details[0]!;

      expect(error.message).toMatch('"weight" must be greater than or equal to 1');
      expect(error.path).toStrictEqual(['weight']);
    });

    it('Should return a "weight is required" error', () => {
      const userPayload = {
        username: 'Pedro',
        invalid: 75,
        email: 'pedroafonso@gmail.com',
        password: 'password123',
        confirmPassword: 'password123'
      };

      const error = TestUtils.validateObject(ValidateUser.registerUser(), userPayload).error!.details[0]!;

      expect(error.message).toMatch('"weight" is required');
      expect(error.path).toStrictEqual(['weight']);
    });

  });

  describe('Validate email field and value', () => {

    it('Should return a "email must be a valid email" error', () => {
      const userPayload = {
        username: 'Pedro',
        weight: 75,
        email: 'pedroafonsogmail.com',
        password: 'password123',
        confirmPassword: 'password123'
      };

      const error = TestUtils.validateObject(ValidateUser.registerUser(), userPayload).error!.details[0]!;

      expect(error.message).toMatch('"email" must be a valid email');
      expect(error.path).toStrictEqual(['email']);
    });

    it('Should return a "email is required" error', () => {
      const userPayload = {
        username: 'Pedro',
        weight: 75,
        invalid: 'pedroafonso@gmail.com',
        password: 'password123',
        confirmPassword: 'password123'
      };

      const error = TestUtils.validateObject(ValidateUser.registerUser(), userPayload).error!.details[0]!;

      expect(error.message).toMatch('"email" is required');
      expect(error.path).toStrictEqual(['email']);
    });

  });

});