import AuthenticationError from '../../errors/unauthorizedAccessError';
import BadRequestError from '../../errors/badRequestError';
import DuplicatedValueError from '../../errors/duplicatedContentError';
import InternalServerError from '../../errors/internalServerError';
import NotFoundError from '../../errors/notFoundError';
import ApiError from '../../errors/apiError';

describe('Check if errors status code, name and message are correct', () => {

  describe('AuthenticationError should', () => {

    it('AuthenticationError should be working properly even without a argument in constructor', () => {

      try {
        throw new AuthenticationError();
      } catch (error: any) {
        expect(error).toStrictEqual(new AuthenticationError());
        expect(error.name).toBe('UnauthorizedAccessError');
        expect(error.message).toBe('You are not allowed to access this content.');
      }

    });

    it('AuthenticationError should have a different message if it is passed in constructor', () => {

      try {
        throw new AuthenticationError('Different message');
      } catch (error: any) {
        expect(error).toStrictEqual(new AuthenticationError('Different message'));
        expect(error.name).toBe('UnauthorizedAccessError');
        expect(error.message).toBe('Different message');
      }

    });

  });

  describe('BadRequestError should', () => {

    it('BadRequestError should be working properly even without a argument in constructor', () => {

      try {
        throw new BadRequestError();
      } catch (error: any) {
        expect(error).toStrictEqual(new BadRequestError());
        expect(error.name).toBe('BadRequestError');
        expect(error.message).toBe('The payload is invalid.');
      }

    });

    it('BadRequestError should have a different message if it is passed in constructor', () => {

      try {
        throw new BadRequestError('Different message');
      } catch (error: any) {
        expect(error).toStrictEqual(new BadRequestError('Different message'));
        expect(error.name).toBe('BadRequestError');
        expect(error.message).toBe('Different message');
      }

    });

  });

  describe('DuplicatedValueError should', () => {

    it('be working properly even without a argument in constructor', () => {

      try {
        throw new DuplicatedValueError();
      } catch (error: any) {
        expect(error).toStrictEqual(new DuplicatedValueError());
        expect(error.name).toBe('DuplicatedContentError');
        expect(error.message).toBe('The entered value is already registered');
      }

    });

    it('have a different message if it is passed in constructor', () => {

      try {
        throw new DuplicatedValueError('Different message');
      } catch (error: any) {
        expect(error).toStrictEqual(new DuplicatedValueError('Different message'));
        expect(error.name).toBe('DuplicatedContentError');
        expect(error.message).toBe('Different message');
      }

    });

  });

  describe('APIError should', () => {

    it('be working properly even without a argument in constructor', () => {

      try {
        throw new ApiError();
      } catch (error: any) {
        expect(error).toStrictEqual(new ApiError());
        expect(error.name).toBe('InternalServerError');
        expect(error.message).toBe('A unknown error ocurred. Please try again later!');
      }

    });

    it('have a different message if it is passed in constructor', () => {

      try {
        throw new ApiError('Different message');
      } catch (error: any) {
        expect(error).toStrictEqual(new ApiError('Different message'));
        expect(error.name).toBe('InternalServerError');
        expect(error.message).toBe('Different message');
      }

    });
  });
  describe('InternalServerError should', () => {

    it('be working properly even without a argument in constructor', () => {

      try {
        throw new InternalServerError();
      } catch (error: any) {
        expect(error).toStrictEqual(new InternalServerError());
        expect(error.name).toBe('InternalServerError');
        expect(error.message).toBe('A unknown error ocurred. Please try again later!');
      }

    });

    it('have a different message if it is passed in constructor', () => {

      try {
        throw new InternalServerError('Different message');
      } catch (error: any) {
        expect(error).toStrictEqual(new InternalServerError('Different message'));
        expect(error.name).toBe('InternalServerError');
        expect(error.message).toBe('Different message');
      }

    });
  });

  describe('NotFoundError should', () => {

    it('be working properly even without a argument in constructor', () => {

      try {
        throw new NotFoundError();
      } catch (error: any) {
        expect(error).toStrictEqual(new NotFoundError());
        expect(error.name).toBe('NotFoundError');
        expect(error.message).toBe('No items matches with the query.');
      }

    });

    it('have a different message if it is passed in constructor', () => {

      try {
        throw new NotFoundError('Different message');
      } catch (error: any) {
        expect(error).toStrictEqual(new NotFoundError('Different message'));
        expect(error.name).toBe('NotFoundError');
        expect(error.message).toBe('Different message');
      }

    });
  });
});
