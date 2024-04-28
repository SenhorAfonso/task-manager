import { MongoMemoryServer } from 'mongodb-memory-server';
import StatusCodes from 'http-status-codes';
import mongoose from 'mongoose';
import request from 'supertest';
import taskSchema from '../../../task/schema/taskSchema';
import server from '../../../server';
import categorySchema from '../../../category/schema/categorySchema';
import userSchema from '../../../user/schema/userSchema';
import serverConfig from '../../../config/config';
import TestUtils from '../../../utils/testUtils';

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

  it('Should return 401 when the user is not logged-in', async () => {
    const createCategoryPayload = {
      name: 'Graduation',
      color: 'Red'
    };

    await request(server)
      .post('/api/v1/category')
      .send(createCategoryPayload);

    const createTaskPayload = {
      title: 'Finish the homework',
      description: 'The homework is the API',
      type: 'Homework',
      category: 'Graduation',
      status: 'pending'
    };

    const response = await request(server)
      .post('/api/v1/task')
      .send(createTaskPayload);

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(response.body.error.message).toBe('Unauthenticated!');
    expect(response.body.success).toBeFalsy();
  });
  it('Should return 401 when the token is invalid', async () => {
    const response = await request(server)
      .post('/api/v1/task')
      .auth('Bearer invalid', { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(response.body.error.message).toBe('Unauthenticated!');
    expect(response.body.success).toBeFalsy();
  });

  it('Should return 201 when the payload is valid', async () => {
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

    const response = await request(server)
      .post('/api/v1/task')
      .send(createTaskPayload)
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.body.message).toBe('Task successfully created!');
    expect(response.body.success).toBeTruthy();
  });

  it('Should return 404 when the category do not exist', async () => {
    const token = serverConfig.TEST_TOKEN_1!;

    const createTaskPayload = {
      title: 'Finish the homework',
      description: 'The homework is the API',
      type: 'Homework',
      category: 'Graduation',
      status: 'pending'
    };

    const response = await request(server)
      .post('/api/v1/task')
      .send(createTaskPayload)
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
    expect(response.body.error.message).toBe('The category do not exist!');
    expect(response.body.success).toBeFalsy();
  });

  it('Should return 500 when the database is not connected', async () => {
    await mongoose.connection.close();
    const token = serverConfig.TEST_TOKEN_1!;

    const createTaskPayload = {
      title: 'Finish the homework',
      description: 'The homework is the API',
      type: 'Homework',
      category: 'Graduation',
      status: 'pending'
    };

    const response = await request(server)
      .post('/api/v1/task')
      .send(createTaskPayload)
      .auth(token, { type: 'bearer' });

    await mongoose.connect(mongoURI);
    expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body.error.message).toBe('An internal server error ocurred. Please try again later.');
    expect(response.body.success).toBeFalsy();

  });

});