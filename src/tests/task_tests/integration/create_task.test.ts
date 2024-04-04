import { MongoMemoryServer } from 'mongodb-memory-server';
import StatusCodes from 'http-status-codes';
import mongoose from 'mongoose';
import request from 'supertest';
import taskSchema from '../../../task/schema/taskSchema';
import server from '../../../server';

let mongoServer: MongoMemoryServer;

describe('Chech task\'s create route http responses', () => {
  beforeEach(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoURI = mongoServer.getUri();
    mongoose.connect(mongoURI);
  });

  afterEach(async () => {
    await taskSchema.collection.drop();
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

});