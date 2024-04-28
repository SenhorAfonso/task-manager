import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import categorySchema from '../../../category/schema/categorySchema';
import taskSchema from '../../../task/schema/taskSchema';
import userSchema from '../../../user/schema/userSchema';
import server from '../../../server';
import serverConfig from '../../../config/config';

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

  it('Should return an object with all user\'s tasks info when authenticated', async () => {
    const token = serverConfig.TEST_TOKEN_1!;

    const createCategoryPayload1 = {
      name: 'Graduation',
      color: 'Red'
    };

    await request(server)
      .post('/api/v1/category')
      .send(createCategoryPayload1)
      .auth(token, { type: 'bearer' });

    const createTaskPayload1 = {
      title: 'Finish the homework',
      description: 'Make the Dishes',
      type: 'Cleaning',
      category: 'Graduation',
      status: 'pending'
    };

    const createTaskPayload2 = {
      title: 'Finish the homework',
      description: 'This task description is unnecessarily long for tests purposes',
      type: 'Homework',
      category: 'Graduation',
      status: 'pending'
    };

    const createTaskPayload3 = {
      title: 'Finish the homework',
      description: 'Make the Dishes',
      type: 'Cleaning',
      category: 'Graduation',
      status: 'finished'
    };

    await request(server)
      .post('/api/v1/task')
      .send(createTaskPayload1)
      .auth(token, { type: 'bearer' });

    const longestTaskResponse = await request(server)
      .post('/api/v1/task')
      .send(createTaskPayload2)
      .auth(token, { type: 'bearer' });

    const task3Response = await request(server)
      .post('/api/v1/task')
      .send(createTaskPayload3)
      .auth(token, { type: 'bearer' });

    const longestDescriptionTaskId = longestTaskResponse.body.result._id;
    const oldestTask = task3Response.body.result._id;

    const response = await request(server)
      .get('/api/v1/task-info')
      .query({ category: 'Graduation' })
      .auth(token, { type: 'bearer' });

    expect(response.body.result.number_of_tasks).toBe(3);
    expect(response.body.result.conclusion_avg).toBe(0.33);
    expect(response.body.result.longest_description.id).toBe(longestDescriptionTaskId);
    expect(response.body.result.oldest_task.id).toBe(oldestTask);
    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.success).toBeTruthy();

  });

  it('Should return 401 status code when not authenticated', async () => {
    const response = await request(server)
      .get('/api/v1/task-info')
      .query({ category: 'Graduation' });

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(response.body.success).toBeFalsy();
    expect(response.body.error.message).toBe('Unauthenticated!');

  });

  it('Should return 500 when the database is not connected', async () => {
    await mongoose.connection.close();
    const token = serverConfig.TEST_TOKEN_1!;

    const response = await request(server)
      .get('/api/v1/task-info')
      .auth(token, { type: 'bearer' });

    await mongoose.connect(mongoURI);
    expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body.error.message).toBe('An internal server error ocurred. Please try again later.');
    expect(response.body.success).toBeFalsy();

  });

});