import ValidateCategory from '../../../category/validations/validateCategory';
import TestUtils from '../../utils/testUtils';

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

});