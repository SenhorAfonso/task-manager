import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import categorySchema from '../../../category/schema/categorySchema';
import taskSchema from '../../../task/schema/taskSchema';
import userSchema from '../../../user/schema/userSchema';
import server from '../../../server';
import serverConfig from '../../../config/config';
import TestUtils from '../../../utils/testUtils';

let mongoServer: MongoMemoryServer;
let mongoURI: string;

describe('Chech task\'s get all tasks by array route http responses', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    mongoURI = mongoServer.getUri();
    await mongoose.connect(mongoURI);
  });

  afterEach(async () => {
    await userSchema.collection.deleteMany({});
    await categorySchema.collection.deleteMany({});
    await taskSchema.collection.deleteMany({});
  });

  afterAll(async () => {
    await mongoServer.stop();
    await mongoose.connection.close();
  });

  it('Should return 401 when the user is not logged-in', async () => {
    const response = await request(server)
      .get('/api/v1/task-array')
      .query({ category: 'Graduation' });

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(response.body.error.message).toBe('Unauthenticated!');
    expect(response.body.success).toBeFalsy();
  });

  it('should return an array only with the task with "Graduation" category', async () => {
    const token = serverConfig.TEST_TOKEN_1!;

    const createCategoryPayload1 = {
      name: 'Graduation',
      color: 'Red'
    };

    const createCategoryPayload2 = {
      name: 'Home',
      color: 'Yellow'
    };

    await request(server)
      .post('/api/v1/category')
      .send(createCategoryPayload1)
      .auth(token, { type: 'bearer' });

    await request(server)
      .post('/api/v1/category')
      .send(createCategoryPayload2)
      .auth(token, { type: 'bearer' });

    const createTaskPayload1 = {
      title: 'Finish the homework',
      description: 'The homework is the API',
      type: 'Homework',
      category: 'Graduation',
      status: 'pending'
    };

    const createTaskPayload2 = {
      title: 'Finish the homework',
      description: 'Make the Dishes',
      type: 'Cleaning',
      category: 'Home',
      status: 'pending'
    };

    await request(server)
      .post('/api/v1/task')
      .send(createTaskPayload1)
      .auth(token, { type: 'bearer' });

    await request(server)
      .post('/api/v1/task')
      .send(createTaskPayload2)
      .auth(token, { type: 'bearer' });

    const response = await request(server)
      .get('/api/v1/task-array')
      .query({ category: 'Graduation' })
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.message).toBe('All task were retrieved!');
    expect(response.body.result).toBeDefined();
    expect(response.body.result).toHaveLength(1);

  });

  it('should return 404 when the category name do not exist', async () => {
    const token = serverConfig.TEST_TOKEN_1!;

    const createCategoryPayload = {
      name: 'Graduation',
      color: 'Red'
    };

    await TestUtils.createCategory(token, createCategoryPayload);

    const createTaskPayload = {
      title: 'Finish the homework',
      description: 'The homework is the API',
      type: 'Homework',
      category: 'Graduation',
      status: 'pending'
    };

    await request(server)
      .post('/api/v1/task')
      .send(createTaskPayload)
      .auth(token, { type: 'bearer' });

    const response = await request(server)
      .get('/api/v1/task-array')
      .query({ category: 'invalid' })
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
    expect(response.body.error.message).toBe('The category "invalid" does not exist!');
    expect(response.body.error.name).toBe('NotFoundError');
    expect(response.body.success).toBeFalsy();

  });

  it('should return an array only with the task with "finished" status', async () => {
    const token = serverConfig.TEST_TOKEN_1!;

    const createCategoryPayload1 = {
      name: 'Graduation',
      color: 'Red'
    };

    const createCategoryPayload2 = {
      name: 'House',
      color: 'Yellow'
    };

    await TestUtils.createCategory(token, createCategoryPayload1);
    await TestUtils.createCategory(token, createCategoryPayload2);

    const createTaskPayload1 = {
      title: 'Finish the homework',
      description: 'The homework is the API',
      type: 'Homework',
      category: 'Graduation',
      status: 'pending'
    };

    const createTaskPayload2 = {
      title: 'Finish the homework',
      description: 'Make the Dishes',
      type: 'Cleaning',
      category: 'House',
      status: 'finished'
    };

    await TestUtils.creatTask(token, createTaskPayload1);
    await TestUtils.creatTask(token, createTaskPayload2);

    const response = await request(server)
      .get('/api/v1/task-array')
      .query({ status: 'finished' })
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.message).toBe('All task were retrieved!');
    expect(response.body.result).toBeDefined();
    expect(response.body.result).toHaveLength(1);

  });

  it('should return an array only with the task with "conclusion-date" field equal to query', async () => {
    const token = serverConfig.TEST_TOKEN_1!;
    const conclusionDate = (new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 30))).toLocaleDateString();

    const createCategoryPayload1 = {
      name: 'Graduation',
      color: 'Red'
    };

    const createCategoryPayload2 = {
      name: 'House',
      color: 'Yellow'
    };

    await TestUtils.createCategory(token, createCategoryPayload1);
    await TestUtils.createCategory(token, createCategoryPayload2);

    const createTaskPayload1 = {
      title: 'Finish the homework',
      description: 'The homework is the API',
      type: 'Homework',
      category: 'Graduation',
      status: 'pending'
    };

    const createTaskPayload2 = {
      title: 'Finish the homework',
      description: 'Make the Dishes',
      type: 'Cleaning',
      category: 'House',
      status: 'finished'
    };

    await TestUtils.creatTask(token, createTaskPayload1);
    await TestUtils.creatTask(token, createTaskPayload2);

    await request(server)
      .get('/api/v1/task')
      .auth(token, { type: 'bearer' });

    const response = await request(server)
      .get('/api/v1/task-array')
      .query({ conclusion: conclusionDate })
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.message).toBe('All task were retrieved!');
    expect(response.body.result).toBeDefined();
    expect(response.body.result).toHaveLength(2);

  });

  it('Should return 500 when the database is not connected', async () => {
    await mongoose.connection.close();
    const token = serverConfig.TEST_TOKEN_1!;

    const response = await request(server)
      .get('/api/v1/task')
      .auth(token, { type: 'bearer' });

    await mongoose.connect(mongoURI);
    expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body.error.message).toBe('An internal server error ocurred. Please try again later.');
    expect(response.body.success).toBeFalsy();

  });

});