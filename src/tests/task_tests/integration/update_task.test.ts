import { MongoMemoryServer } from 'mongodb-memory-server';
import StatusCodes from 'http-status-codes';
import mongoose from 'mongoose';
import request from 'supertest';
import taskSchema from '../../../task/schema/taskSchema';
import server from '../../../server';
import TestUtils from '../../../utils/testUtils';
import userSchema from '../../../user/schema/userSchema';
import categorySchema from '../../../category/schema/categorySchema';
import serverConfig from '../../../config/config';

let mongoServer: MongoMemoryServer;
let mongoURI: string;

describe('Chech task\'s update route http responses', () => {
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

  it('Should return 401 when the route is not authenticated', async () => {
    const token = serverConfig.TEST_TOKEN_1!;

    const createCategoryPayload = {
      name: 'Graduation',
      color: 'Red'
    };

    await TestUtils.createCategory(token, createCategoryPayload);

    const createTaskIncorrectPayload = {
      title: 'incorrect title',
      description: 'incorrect description',
      type: 'incorrect type',
      category: 'Graduation',
      status: 'pending',
    };

    const createTaskCorrectPayload = {
      title: 'Finish the homework',
      description: 'The homework is the API',
      type: 'Homework',
      category: 'Graduation',
      status: 'pending',
    };

    const taskID = await TestUtils.creatTask(token, createTaskIncorrectPayload);

    const response = await request(server)
      .put(`/api/v1/task/${taskID}`)
      .send(createTaskCorrectPayload);

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(response.body.success).toBeFalsy();
    expect(response.body.error.message).toBe('Unauthenticated!');

  });

  it('Should return 200 when the route is authenticated and the payload is valid', async () => {
    const token = serverConfig.TEST_TOKEN_1!;

    const createCategoryPayload = {
      name: 'Graduation',
      color: 'Red'
    };

    await TestUtils.createCategory(token, createCategoryPayload);

    const createTaskIncorrectPayload = {
      title: 'incorrect title',
      description: 'incorrect description',
      type: 'incorrect type',
      category: 'Graduation',
      status: 'pending',
    };

    const createTaskCorrectPayload = {
      title: 'Finish the homework',
      description: 'The homework is the API',
      type: 'Homework',
      category: 'Graduation',
      status: 'pending',
    };

    const taskID = await TestUtils.creatTask(token, createTaskIncorrectPayload);

    const response = await request(server)
      .put(`/api/v1/task/${taskID}`)
      .send(createTaskCorrectPayload)
      .auth(token, { type : 'bearer' });

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('Task information were updated!');

  });

  it('Should return 404 when the route is authenticated but the new category name is not registered', async () => {
    const token = serverConfig.TEST_TOKEN_1!;

    const createCategoryPayload = {
      name: 'Graduation',
      color: 'Red'
    };

    await TestUtils.createCategory(token, createCategoryPayload);

    const createTaskIncorrectPayload = {
      title: 'incorrect title',
      description: 'incorrect description',
      type: 'incorrect type',
      category: 'Graduation',
      status: 'pending',
    };

    const createTaskCorrectPayload = {
      title: 'Finish the homework',
      description: 'The homework is the API',
      type: 'Homework',
      category: 'incorrect',
      status: 'pending',
    };

    const taskID = await TestUtils.creatTask(token, createTaskIncorrectPayload);

    const response = await request(server)
      .put(`/api/v1/task/${taskID}`)
      .send(createTaskCorrectPayload)
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
    expect(response.body.success).toBeFalsy();
    expect(response.body.error.message).toBe('The category "incorrect" is not registered!');

  });

  it('Should return 400 when the route is authenticated but the taskID format is invalid', async () => {
    const token = serverConfig.TEST_TOKEN_1!;

    const createCategoryPayload = {
      name: 'Graduation',
      color: 'Red'
    };

    await TestUtils.createCategory(token, createCategoryPayload);

    const createTaskIncorrectPayload = {
      title: 'incorrect title',
      description: 'incorrect description',
      type: 'incorrect type',
      category: 'Graduation',
      status: 'pending',
    };

    const createTaskCorrectPayload = {
      title: 'Finish the homework',
      description: 'The homework is the API',
      type: 'Homework',
      category: 'Graduation',
      status: 'pending',
    };

    await TestUtils.creatTask(token, createTaskIncorrectPayload);

    const response = await request(server)
      .put('/api/v1/task/invalid')
      .send(createTaskCorrectPayload)
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.success).toBeFalsy();
    expect(response.body.error.message).toBe('The format of the id "invalid" is invalid!');

  });

  it('Should return 404 when the route is authenticated but the taskID is not associated to any element', async () => {
    const fakeTaskId = '6611eccbd8916833bd4e4369';

    const token = serverConfig.TEST_TOKEN_1!;

    const createCategoryPayload = {
      name: 'Graduation',
      color: 'Red'
    };

    await TestUtils.createCategory(token, createCategoryPayload);

    const createTaskIncorrectPayload = {
      title: 'incorrect title',
      description: 'incorrect description',
      type: 'incorrect type',
      category: 'Graduation',
      status: 'pending',
    };

    const createTaskCorrectPayload = {
      title: 'Finish the homework',
      description: 'The homework is the API',
      type: 'Homework',
      category: 'Graduation',
      status: 'pending',
    };

    await TestUtils.creatTask(token, createTaskIncorrectPayload);

    const response = await request(server)
      .put(`/api/v1/task/${fakeTaskId}`)
      .send(createTaskCorrectPayload)
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
    expect(response.body.success).toBeFalsy();
    expect(response.body.error.message).toBe('The id "6611eccbd8916833bd4e4369" is not associated with any element!');

  });

  it('Should return 401 when the route is authenticated but the user do not own the task', async () => {
    const tokenUser1 = serverConfig.TEST_TOKEN_1!;
    const tokenUser2 = serverConfig.TEST_TOKEN_2!;

    const createCategoryPayload = {
      name: 'Graduation',
      color: 'Red'
    };

    await TestUtils.createCategory(tokenUser1, createCategoryPayload);

    const createTaskIncorrectPayload = {
      title: 'incorrect title',
      description: 'incorrect description',
      type: 'incorrect type',
      category: 'Graduation',
      status: 'pending',
    };

    const createTaskCorrectPayload = {
      title: 'Finish the homework',
      description: 'The homework is the API',
      type: 'Homework',
      category: 'Graduation',
      status: 'pending',
    };

    const taskID = await TestUtils.creatTask(tokenUser1, createTaskIncorrectPayload);

    const response = await request(server)
      .put(`/api/v1/task/${taskID}`)
      .send(createTaskCorrectPayload)
      .auth(tokenUser2, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(response.body.success).toBeFalsy();
    expect(response.body.error.message).toBe('You do not have permissions to update this task!');

  });

  it('Should return 500 when the database is not connected', async () => {
    await mongoose.connection.close();
    const token = serverConfig.TEST_TOKEN_1!;

    const payload = {
      title: 'incorrect title',
      description: 'incorrect description',
      type: 'incorrect type',
      category: 'Graduation',
      status: 'pending',
    };

    const response = await request(server)
      .put('/api/v1/task/6611eccbd8916833bd4e4369')
      .send(payload)
      .auth(token, { type: 'bearer' });

    await mongoose.connect(mongoURI);
    expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body.error.message).toBe('An internal server error ocurred. Please try again later.');
    expect(response.body.success).toBeFalsy();

  });

});