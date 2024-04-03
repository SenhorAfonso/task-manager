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

  describe('Validate password field and value', () => {

    it('Should return an "invalid pattern " error to passwords with less than 6 characters', () => {
      const userPayload = {
        username: 'Pedro',
        weight: 75,
        email: 'pedroafonso@gmail.com',
        password: 'pass',
        confirmPassword: 'password123'
      };

      const error = TestUtils.validateObject(ValidateUser.registerUser(), userPayload).error!.details[0]!;

      expect(error.message).toMatch('"password" with value "pass" fails to match the required pattern: /^[a-zA-Z0-9]{6,30}$/');
      expect(error.path).toStrictEqual(['password']);
    });

    it('Should return a "password is required" error', () => {
      const userPayload = {
        username: 'Pedro',
        weight: 75,
        email: 'pedroafonso@gmail.com',
        invalid: 'password123',
        confirmPassword: 'password123'
      };

      const error = TestUtils.validateObject(ValidateUser.registerUser(), userPayload).error!.details[0]!;

      expect(error.message).toMatch('"password" is required');
      expect(error.path).toStrictEqual(['password']);
    });

  });

  describe('Validate confirm password field and value', () => {

    it('Should return an "invalid pattern " error to password confirmation with less than 6 characters', () => {
      const userPayload = {
        username: 'Pedro',
        weight: 75,
        email: 'pedroafonso@gmail.com',
        password: 'password123',
        confirmPassword: 'pass'
      };

      const error = TestUtils.validateObject(ValidateUser.registerUser(), userPayload).error!.details[0]!;

      expect(error.message).toMatch('"confirmPassword" with value "pass" fails to match the required pattern: /^[a-zA-Z0-9]{6,30}$/');
      expect(error.path).toStrictEqual(['confirmPassword']);
    });

    it('Should return a "confirmPassword is required" error', () => {
      const userPayload = {
        username: 'Pedro',
        weight: 75,
        email: 'pedroafonso@gmail.com',
        password: 'password123',
        invalid: 'password123'
      };

      const error = TestUtils.validateObject(ValidateUser.registerUser(), userPayload).error!.details[0]!;

      expect(error.message).toMatch('"confirmPassword" is required');
      expect(error.path).toStrictEqual(['confirmPassword']);
    });

  });

});
describe('Validation payload for users sign-in route.', () => {

  describe('Validate email field and value', () => {

    it('Should return a "email must be a valid email" error', () => {
      const userPayload = {
        username: 'Pedro',
        weight: 75,
        email: 'pedroafonsogmail.com',
        password: 'password123',
        confirmPassword: 'password123'
      };

      const error = TestUtils.validateObject(ValidateUser.loginUser(), userPayload).error!.details[0]!;

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

      const error = TestUtils.validateObject(ValidateUser.loginUser(), userPayload).error!.details[0]!;

      expect(error.message).toMatch('"email" is required');
      expect(error.path).toStrictEqual(['email']);
    });

  });

  describe('Validate password field and value', () => {

    it('Should return an "invalid pattern " error to passwords with less than 6 characters', () => {
      const userPayload = {
        username: 'Pedro',
        weight: 75,
        email: 'pedroafonso@gmail.com',
        password: 'pass',
        confirmPassword: 'password123'
      };

      const error = TestUtils.validateObject(ValidateUser.loginUser(), userPayload).error!.details[0]!;

      expect(error.message).toMatch('"password" with value "pass" fails to match the required pattern: /^[a-zA-Z0-9]{6,30}$/');
      expect(error.path).toStrictEqual(['password']);
    });

    it('Should return a "password is required" error', () => {
      const userPayload = {
        username: 'Pedro',
        weight: 75,
        email: 'pedroafonso@gmail.com',
        invalid: 'password123',
        confirmPassword: 'password123'
      };

      const error = TestUtils.validateObject(ValidateUser.loginUser(), userPayload).error!.details[0]!;

      expect(error.message).toMatch('"password" is required');
      expect(error.path).toStrictEqual(['password']);
    });

  });

});