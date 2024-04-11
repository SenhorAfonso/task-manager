import { MongoMemoryServer } from 'mongodb-memory-server';
import StatusCodes from 'http-status-codes';
import mongoose from 'mongoose';
import request from 'supertest';
import taskSchema from '../../../task/schema/taskSchema';
import server from '../../../server';
import TestUtils from '../../../utils/testUtils';
import userSchema from '../../../user/schema/userSchema';
import categorySchema from '../../../category/schema/categorySchema';

let mongoServer: MongoMemoryServer;

describe('Chech task\'s update route http responses', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoURI = mongoServer.getUri();
    await mongoose.connect(mongoURI);
  });

  afterEach(async () => {
    await userSchema.collection.drop();
    await categorySchema.collection.drop();
    await taskSchema.collection.drop();
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

});