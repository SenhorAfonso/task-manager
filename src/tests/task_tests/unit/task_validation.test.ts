import ValidateTask from '../../../task/validations/validateTask';
import TestUtils from '../../../utils/testUtils';

describe('Payload validation for create new task route', () => {

  describe('Validate title field and value', () => {

    it('Should return a "title lenght must be at least 5 characters long" error', () => {

      const taskPayload = {
        title: 'Fini',
        description: 'I have to finish the test suit',
        type: 'Homework',
        category: 'Graduation',
        status: 'pending'
      };

      const error = TestUtils.validateObject(ValidateTask.createTaks(), taskPayload).error!.details[0]!;

      expect(error.message).toMatch('"title" length must be at least 5 characters long');
      expect(error.path).toStrictEqual(['title']);

    });

    it('Should return a "title is not allowed to be empty" error', () => {

      const taskPayload = {
        title: '',
        description: 'I have to finish the test suit',
        type: 'Homework',
        category: 'Graduation',
        status: 'pending'
      };

      const error = TestUtils.validateObject(ValidateTask.createTaks(), taskPayload).error!.details[0]!;

      expect(error.message).toMatch('"title" is not allowed to be empty');
      expect(error.path).toStrictEqual(['title']);

    });

    it('Should return a "title is required" error', () => {

      const taskPayload = {
        invalid: 'Finish the API',
        description: 'I have to finish the test suit',
        type: 'Homework',
        category: 'Graduation',
        status: 'pending'
      };

      const error = TestUtils.validateObject(ValidateTask.createTaks(), taskPayload).error!.details[0]!;

      expect(error.message).toMatch('"title" is required');
      expect(error.path).toStrictEqual(['title']);

    });

  });

  describe('Validate description field and value', () => {

    it('Should return a "description lenght must be at least 5 characters long" error', () => {

      const taskPayload = {
        title: 'Finish the API',
        description: 'inva',
        type: 'Homework',
        category: 'Graduation',
        status: 'pending'
      };

      const error = TestUtils.validateObject(ValidateTask.createTaks(), taskPayload).error!.details[0]!;

      expect(error.message).toMatch('"description" length must be at least 5 characters long');
      expect(error.path).toStrictEqual(['description']);

    });

    it('Should return a "description is not allowed to be empty" error', () => {

      const taskPayload = {
        title: 'Finish the API',
        description: '',
        type: 'Homework',
        category: 'Graduation',
        status: 'pending'
      };

      const error = TestUtils.validateObject(ValidateTask.createTaks(), taskPayload).error!.details[0]!;

      expect(error.message).toMatch('"description" is not allowed to be empty');
      expect(error.path).toStrictEqual(['description']);

    });

    it('Should return a "description is required" error', () => {

      const taskPayload = {
        invalid: 'Finish the API',
        description: 'I have to finish the test suit',
        type: 'Homework',
        category: 'Graduation',
        status: 'pending'
      };

      const error = TestUtils.validateObject(ValidateTask.createTaks(), taskPayload).error!.details[0]!;

      expect(error.message).toMatch('"title" is required');
      expect(error.path).toStrictEqual(['title']);

    });

  });

  describe('Validate type field and value', () => {

    it('Should return a "type is not allowed to be empty" error', () => {

      const taskPayload = {
        title: 'Finish the API',
        description: 'I have to finish the test suit',
        type: '',
        category: 'Graduation',
        status: 'pending'
      };

      const error = TestUtils.validateObject(ValidateTask.createTaks(), taskPayload).error!.details[0]!;

      expect(error.message).toMatch('"type" is not allowed to be empty');
      expect(error.path).toStrictEqual(['type']);

    });

    it('Should return a "type is required" error', () => {

      const taskPayload = {
        title: 'Finish the API',
        description: 'I have to finish the test suit',
        invalid: 'Homework',
        category: 'Graduation',
        status: 'pending'
      };

      const error = TestUtils.validateObject(ValidateTask.createTaks(), taskPayload).error!.details[0]!;

      expect(error.message).toMatch('"type" is required');
      expect(error.path).toStrictEqual(['type']);

    });

  });

  describe('Validate category field and value', () => {

    it('Should return a "category is not allowed to be empty" error', () => {

      const taskPayload = {
        title: 'Finish the API',
        description: 'I have to finish the test suit',
        type: 'Homework',
        category: '',
        status: 'pending'
      };

      const error = TestUtils.validateObject(ValidateTask.createTaks(), taskPayload).error!.details[0]!;

      expect(error.message).toMatch('"category" is not allowed to be empty');
      expect(error.path).toStrictEqual(['category']);

    });

    it('Should return a "category is required" error', () => {

      const taskPayload = {
        title: 'Finish the API',
        description: 'I have to finish the test suit',
        type: 'Homework',
        invalid: 'Graduation',
        status: 'pending'
      };

      const error = TestUtils.validateObject(ValidateTask.createTaks(), taskPayload).error!.details[0]!;

      expect(error.message).toMatch('"category" is required');
      expect(error.path).toStrictEqual(['category']);

    });

  });

  describe('Validate category field and value', () => {

    it('Should return a "status must be one of" error', () => {

      const taskPayload = {
        title: 'Finish the API',
        description: 'I have to finish the test suit',
        type: 'Homework',
        category: 'Graduation',
        status: ''
      };

      const error = TestUtils.validateObject(ValidateTask.createTaks(), taskPayload).error!.details[0]!;

      expect(error.message).toMatch('"status" must be one of [pending, in-progress, finished]');
      expect(error.path).toStrictEqual(['status']);

    });

    it('Should return a "status is required" error', () => {

      const taskPayload = {
        title: 'Finish the API',
        description: 'I have to finish the test suit',
        type: 'Homework',
        category: 'Graduation',
        invalid: 'pending'
      };

      const error = TestUtils.validateObject(ValidateTask.createTaks(), taskPayload).error!.details[0]!;

      expect(error.message).toMatch('"status" is required');
      expect(error.path).toStrictEqual(['status']);

    });

  });

});
describe('Payload validation for update task route', () => {

  describe('Validate title field and value', () => {

    it('Should return a "title lenght must be at least 5 characters long" error', () => {

      const taskPayload = {
        title: 'Fini',
        description: 'I have to finish the test suit',
        type: 'Homework',
        category: 'Graduation',
        status: 'pending'
      };

      const error = TestUtils.validateObject(ValidateTask.updateTask(), taskPayload).error!.details[0]!;

      expect(error.message).toMatch('"title" length must be at least 5 characters long');
      expect(error.path).toStrictEqual(['title']);

    });

    it('Should return a "title is not allowed to be empty" error', () => {

      const taskPayload = {
        title: '',
        description: 'I have to finish the test suit',
        type: 'Homework',
        category: 'Graduation',
        status: 'pending'
      };

      const error = TestUtils.validateObject(ValidateTask.updateTask(), taskPayload).error!.details[0]!;

      expect(error.message).toMatch('"title" is not allowed to be empty');
      expect(error.path).toStrictEqual(['title']);

    });

    it('Should return a "title is required" error', () => {

      const taskPayload = {
        invalid: 'Finish the API',
        description: 'I have to finish the test suit',
        type: 'Homework',
        category: 'Graduation',
        status: 'pending'
      };

      const error = TestUtils.validateObject(ValidateTask.updateTask(), taskPayload).error!.details[0]!;

      expect(error.message).toMatch('"title" is required');
      expect(error.path).toStrictEqual(['title']);

    });

  });

  describe('Validate description field and value', () => {

    it('Should return a "description lenght must be at least 5 characters long" error', () => {

      const taskPayload = {
        title: 'Finish the API',
        description: 'inva',
        type: 'Homework',
        category: 'Graduation',
        status: 'pending'
      };

      const error = TestUtils.validateObject(ValidateTask.updateTask(), taskPayload).error!.details[0]!;

      expect(error.message).toMatch('"description" length must be at least 5 characters long');
      expect(error.path).toStrictEqual(['description']);

    });

    it('Should return a "description is not allowed to be empty" error', () => {

      const taskPayload = {
        title: 'Finish the API',
        description: '',
        type: 'Homework',
        category: 'Graduation',
        status: 'pending'
      };

      const error = TestUtils.validateObject(ValidateTask.updateTask(), taskPayload).error!.details[0]!;

      expect(error.message).toMatch('"description" is not allowed to be empty');
      expect(error.path).toStrictEqual(['description']);

    });

    it('Should return a "description is required" error', () => {

      const taskPayload = {
        invalid: 'Finish the API',
        description: 'I have to finish the test suit',
        type: 'Homework',
        category: 'Graduation',
        status: 'pending'
      };

      const error = TestUtils.validateObject(ValidateTask.updateTask(), taskPayload).error!.details[0]!;

      expect(error.message).toMatch('"title" is required');
      expect(error.path).toStrictEqual(['title']);

    });

  });

  describe('Validate type field and value', () => {

    it('Should return a "type is not allowed to be empty" error', () => {

      const taskPayload = {
        title: 'Finish the API',
        description: 'I have to finish the test suit',
        type: '',
        category: 'Graduation',
        status: 'pending'
      };

      const error = TestUtils.validateObject(ValidateTask.updateTask(), taskPayload).error!.details[0]!;

      expect(error.message).toMatch('"type" is not allowed to be empty');
      expect(error.path).toStrictEqual(['type']);

    });

    it('Should return a "type is required" error', () => {

      const taskPayload = {
        title: 'Finish the API',
        description: 'I have to finish the test suit',
        invalid: 'Homework',
        category: 'Graduation',
        status: 'pending'
      };

      const error = TestUtils.validateObject(ValidateTask.updateTask(), taskPayload).error!.details[0]!;

      expect(error.message).toMatch('"type" is required');
      expect(error.path).toStrictEqual(['type']);

    });

  });

  describe('Validate category field and value', () => {

    it('Should return a "category is not allowed to be empty" error', () => {

      const taskPayload = {
        title: 'Finish the API',
        description: 'I have to finish the test suit',
        type: 'Homework',
        category: '',
        status: 'pending'
      };

      const error = TestUtils.validateObject(ValidateTask.updateTask(), taskPayload).error!.details[0]!;

      expect(error.message).toMatch('"category" is not allowed to be empty');
      expect(error.path).toStrictEqual(['category']);

    });

    it('Should return a "category is required" error', () => {

      const taskPayload = {
        title: 'Finish the API',
        description: 'I have to finish the test suit',
        type: 'Homework',
        invalid: 'Graduation',
        status: 'pending'
      };

      const error = TestUtils.validateObject(ValidateTask.updateTask(), taskPayload).error!.details[0]!;

      expect(error.message).toMatch('"category" is required');
      expect(error.path).toStrictEqual(['category']);

    });

  });

  describe('Validate category field and value', () => {

    it('Should return a "status must be one of" error', () => {

      const taskPayload = {
        title: 'Finish the API',
        description: 'I have to finish the test suit',
        type: 'Homework',
        category: 'Graduation',
        status: ''
      };

      const error = TestUtils.validateObject(ValidateTask.updateTask(), taskPayload).error!.details[0]!;

      expect(error.message).toMatch('"status" must be one of [pending, in-progress, finished]');
      expect(error.path).toStrictEqual(['status']);

    });

    it('Should return a "status is required" error', () => {

      const taskPayload = {
        title: 'Finish the API',
        description: 'I have to finish the test suit',
        type: 'Homework',
        category: 'Graduation',
        invalid: 'pending'
      };

      const error = TestUtils.validateObject(ValidateTask.updateTask(), taskPayload).error!.details[0]!;

      expect(error.message).toMatch('"status" is required');
      expect(error.path).toStrictEqual(['status']);

    });

  });

});