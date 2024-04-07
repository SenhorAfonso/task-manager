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

describe('Chech task\'s create route http responses', () => {
  beforeEach(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoURI = mongoServer.getUri();
    mongoose.connect(mongoURI);
  });

  afterEach(async () => {
    await userSchema.collection.drop();
    await categorySchema.collection.drop();
    await taskSchema.collection.drop();
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

    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('Single task were retrieved!');
  });

});