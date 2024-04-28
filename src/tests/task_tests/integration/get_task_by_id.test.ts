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

describe('Chech task\'s create route http responses', () => {
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
    const registerUserPayload = {
      username: 'Pedro',
      email: 'pedroafonso@gmail.com',
      weight: 75,
      password: 'password123',
      confirmPassword: 'password123'
    };

    const token = await TestUtils.loginUser(registerUserPayload);

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
      status: 'pending',
    };

    const taskID = await TestUtils.creatTask(token, createTaskPayload);

    const response = await request(server)
      .get(`/api/v1/task/${taskID}`);

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(response.body.success).toBeFalsy();
    expect(response.body.error.message).toBe('Unauthenticated!');

  });

  it('Should return 200 when the route is authenticated and there is at least one task registered', async () => {
    const registerUserPayload = {
      username: 'Pedro',
      email: 'pedroafonso1@gmail.com',
      weight: 75,
      password: 'password123',
      confirmPassword: 'password123'
    };

    const token = await TestUtils.loginUser(registerUserPayload);

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
      status: 'pending',
    };

    const taskID = await TestUtils.creatTask(token, createTaskPayload);

    const response = await request(server)
      .get(`/api/v1/task/${taskID}`)
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('Single task were retrieved!');
  });

  it('Should return 400 when the route is authenticated but the taskID format is invalid', async () => {
    const registerUserPayload = {
      username: 'Pedro',
      email: 'pedroafonso1@gmail.com',
      weight: 75,
      password: 'password123',
      confirmPassword: 'password123'
    };

    const token = await TestUtils.loginUser(registerUserPayload);

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
      status: 'pending',
    };

    await TestUtils.creatTask(token, createTaskPayload);

    const response = await request(server)
      .get('/api/v1/task/invalid')
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.success).toBeFalsy();
    expect(response.body.error.message).toBe('The format of the id invalid is invalid!');
  });

  it('Should return 404 when the route is authenticated but the taskID is not associated to a register', async () => {
    const fakeTaskId = '6611eccbd8916833bd4e4369';

    const registerUserPayload = {
      username: 'Pedro',
      email: 'pedroafonso1@gmail.com',
      weight: 75,
      password: 'password123',
      confirmPassword: 'password123'
    };

    const token = await TestUtils.loginUser(registerUserPayload);

    const response = await request(server)
      .get(`/api/v1/task/${fakeTaskId}`)
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
    expect(response.body.success).toBeFalsy();
    expect(response.body.error.message).toBe(`The id ${fakeTaskId} is not associated with any element!`);
  });

  it('Should return 401 when the route is authenticated but the userID\'s task is not the same of the user logged in', async () => {
    const registerUser1Payload = {
      username: 'Pedro',
      email: 'pedroafonso1@gmail.com',
      weight: 75,
      password: 'password123',
      confirmPassword: 'password123'
    };

    const registerUser2Payload = {
      username: 'Pedro',
      email: 'pedroafonso2@gmail.com',
      weight: 75,
      password: 'password123',
      confirmPassword: 'password123'
    };

    const tokenUser1 = await TestUtils.loginUser(registerUser1Payload);
    const tokenUser2 = await TestUtils.loginUser(registerUser2Payload);

    const createCategoryPayload = {
      name: 'Graduation',
      color: 'Red'
    };

    await TestUtils.createCategory(tokenUser1, createCategoryPayload);

    const createTaskPayload = {
      title: 'Finish the homework',
      description: 'The homework is the API',
      type: 'Homework',
      category: 'Graduation',
      status: 'pending',
    };

    const taskID = await TestUtils.creatTask(tokenUser1, createTaskPayload);

    const response = await request(server)
      .get(`/api/v1/task/${taskID}`)
      .auth(tokenUser2, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(response.body.success).toBeFalsy();
    expect(response.body.error.message).toBe('You do not have permissions to access this task!');
  });

  it('Should return 500 when the database is not connected', async () => {
    await mongoose.connection.close();
    const token = serverConfig.TEST_TOKEN_1!;

    const response = await request(server)
      .get('/api/v1/task/6611eccbd8916833bd4e4369')
      .auth(token, { type: 'bearer' });

    await mongoose.connect(mongoURI);
    expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body.error.message).toBe('An internal server error ocurred. Please try again later.');
    expect(response.body.success).toBeFalsy();

  });

});