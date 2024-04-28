import ValidateCategory from '../../../category/validations/validateCategory';
import TestUtils from '../../../utils/testUtils';

describe('Payload validation for create new category route', () => {

  describe('Validate name field and value', () => {

    it('Should return a "name lenght must be at least 5 characters long" error', () => {
      const categoryPayload = {
        name: 'Do',
        color: 'Red',
      };

      const error = TestUtils.validateObject(ValidateCategory.createCategory(), categoryPayload).error!.details[0]!;

      expect(error.message).toMatch('"name" length must be at least 5 characters long');
      expect(error.path).toStrictEqual(['name']);
    });

    it('Should return a "name is required" error', () => {
      const categoryPayload = {
        invalid: 'Do the dishes',
        color: 'Red',
      };

      const error = TestUtils.validateObject(ValidateCategory.createCategory(), categoryPayload).error!.details[0]!;

      expect(error.message).toMatch('"name" is required');
      expect(error.path).toStrictEqual(['name']);
    });

  });

  describe('Validate color field and value', () => {

    it('Should return a "color must be one of" error', () => {
      const categoryPayload = {
        name: 'Do the dishes',
        color: 'invalid',
      };

      const error = TestUtils.validateObject(ValidateCategory.createCategory(), categoryPayload).error!.details[0]!;

      expect(error.message).toMatch('"color" must be one of [Green, Yellow, Orange, Red, Pink, Purple, Gray, Cyan, Blue]');
      expect(error.path).toStrictEqual(['color']);
    });

    it('Should return a "color is required" error', () => {
      const categoryPayload = {
        name: 'Do the dishes',
        invalid: 'Red',
      };

      const error = TestUtils.validateObject(ValidateCategory.createCategory(), categoryPayload).error!.details[0]!;

      expect(error.message).toMatch('"color" is required');
      expect(error.path).toStrictEqual(['color']);
    });

  });

});

describe('Payload validation for update category route', () => {

  describe('Validate name field and value', () => {

    it('Should return a "name lenght must be at least 5 characters long" error', () => {
      const categoryPayload = {
        name: 'Do',
        color: 'Red',
      };

      const error = TestUtils.validateObject(ValidateCategory.updateCategory(), categoryPayload).error!.details[0]!;

      expect(error.message).toMatch('"name" length must be at least 5 characters long');
      expect(error.path).toStrictEqual(['name']);
    });

    it('Should return a "name is required" error', () => {
      const categoryPayload = {
        invalid: 'Do the dishes',
        color: 'Red',
      };

      const error = TestUtils.validateObject(ValidateCategory.updateCategory(), categoryPayload).error!.details[0]!;

      expect(error.message).toMatch('"name" is required');
      expect(error.path).toStrictEqual(['name']);
    });

  });

  describe('Validate color field and value', () => {

    it('Should return a "color must be one of" error', () => {
      const categoryPayload = {
        name: 'Do the dishes',
        color: 'invalid',
      };

      const error = TestUtils.validateObject(ValidateCategory.createCategory(), categoryPayload).error!.details[0]!;

      expect(error.message).toMatch('"color" must be one of [Green, Yellow, Orange, Red, Pink, Purple, Gray, Cyan, Blue]');
      expect(error.path).toStrictEqual(['color']);
    });

    it('Should return a "color is required" error', () => {
      const categoryPayload = {
        name: 'Do the dishes',
        invalid: 'Red',
      };

      const error = TestUtils.validateObject(ValidateCategory.createCategory(), categoryPayload).error!.details[0]!;

      expect(error.message).toMatch('"color" is required');
      expect(error.path).toStrictEqual(['color']);
    });

  });

});