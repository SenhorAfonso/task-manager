import { MongoMemoryServer } from 'mongodb-memory-server';
import StatusCodes from 'http-status-codes';
import mongoose from 'mongoose';
import request from 'supertest';
import taskSchema from '../../../task/schema/taskSchema';
import server from '../../../server';
import userSchema from '../../../user/schema/userSchema';
import categorySchema from '../../../category/schema/categorySchema';
import serverConfig from '../../../config/config';

let mongoServer: MongoMemoryServer;

describe('Chech task\'s delete route http responses', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoURI = mongoServer.getUri();
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

  it('Should return 400 when the route is authenticated but the taskID format is invalid', async () => {
    const token = serverConfig.TEST_TOKEN_1!;

    const response = await request(server)
      .delete('/api/v1/task/invalid')
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.success).toBeFalsy();
    expect(response.body.error.message).toBe('The format of the id "invalid" is invalid!');

  });

  it('Should return 404 when the route is authenticated but the taskID is not associated to any element', async () => {
    const fakeTaskId = '6611eccbd8916833bd4e4369';
    const token = serverConfig.TEST_TOKEN_1!;

    const response = await request(server)
      .delete(`/api/v1/task/${fakeTaskId}`)
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

    await request(server)
      .post('/api/v1/category')
      .send(createCategoryPayload)
      .auth(tokenUser1, { type: 'bearer' });

    const createTaskPayload = {
      title: 'Finish the homework',
      description: 'The homework is the API',
      type: 'Homework',
      category: 'Graduation',
      status: 'pending',
    };

    const taskID = (await request(server)
      .post('/api/v1/task')
      .send(createTaskPayload)
      .auth(tokenUser1, { type: 'bearer' }))
      ?.body?.result?._id;

    const response = await request(server)
      .delete(`/api/v1/task/${taskID}`)
      .auth(tokenUser2, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(response.body.success).toBeFalsy();
    expect(response.body.error.message).toBe('You do not have permissions to delete this task!');

  });

  it('Should return 200 when the route is authenticated and the payload is valid', async () => {
    const token = serverConfig.TEST_TOKEN_1!;

    const createCategoryPayload = {
      name: 'Graduation',
      color: 'Red'
    };

    await request(server)
      .post('/api/v1/category')
      .send(createCategoryPayload)
      .auth(token, { type: 'bearer' });

    const createTaskPayload = {
      title: 'Finish the homework',
      description: 'The homework is the API',
      type: 'Homework',
      category: 'Graduation',
      status: 'pending',
    };

    const taskID = (await request(server)
      .post('/api/v1/task')
      .send(createTaskPayload)
      .auth(token, { type: 'bearer' }))
      ?.body?.result?._id;

    const response = await request(server)
      .delete(`/api/v1/task/${taskID}`)
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('Task were succesfully deleted!');

  });

  it('Should return 200 when the route is authenticated and the payload is valid', async () => {
    const token = serverConfig.TEST_TOKEN_1!;

    const createCategoryPayload = {
      name: 'Graduation',
      color: 'Red'
    };

    await request(server)
      .post('/api/v1/category')
      .send(createCategoryPayload)
      .auth(token, { type: 'bearer' });

    const createTaskPayload = {
      title: 'Finish the homework',
      description: 'The homework is the API',
      type: 'Homework',
      category: 'Graduation',
      status: 'pending',
    };

    const taskID = (await request(server)
      .post('/api/v1/task')
      .send(createTaskPayload)
      .auth(token, { type: 'bearer' }))
      ?.body?.result?._id;

    const response = await request(server)
      .delete(`/api/v1/task/${taskID}`)
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('Task were succesfully deleted!');

  });

});