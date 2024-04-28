import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import server from '../../../server';
import categorySchema from '../../../category/schema/categorySchema';
import taskSchema from '../../../task/schema/taskSchema';
import userSchema from '../../../user/schema/userSchema';
import serverConfig from '../../../config/config';

let mongoServer: MongoMemoryServer;
let mongoURI: string;

describe('Check for task\'s aggregate route', () => {

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

  it('Should return an array ', async () => {
    const token = serverConfig.TEST_TOKEN_1!;

    const createCategoryPayload1 = {
      name: 'Graduation',
      color: 'Red'
    };

    const createCategoryPayload2 = {
      name: 'House',
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
      category: 'House',
      status: 'finished'
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
      .get('/api/v1/task-aggregate')
      .auth(token, { type: 'bearer' });

    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('All task were retrieved');
    expect(response.body.result).toBeDefined();
    expect(response.body.result).toHaveLength(2);

  });

});