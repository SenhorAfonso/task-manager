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

  it('Should return 200 when the userID is valid and associated to at least one register', async () => {
    const userSignUpPayload = {
      username: 'Pedro',
      email: 'pedroafonso@gmail.com',
      weight: 75,
      password: 'password123',
      confirmPassword: 'password123'
    };

    await request(server)
      .post('/api/v1/user/signup')
      .send(userSignUpPayload);

    const userLoginPayload = {
      email: 'pedroafonso@gmail.com',
      password: 'password123'
    };

    const loginResponse = await request(server)
      .post('/api/v1/user/login')
      .send(userLoginPayload);

    const { token } = loginResponse.body.data;

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
      status: 'pending'
    };

    await request(server)
      .post('/api/v1/task')
      .send(createTaskPayload)
      .auth(token, { type: 'bearer' });
    await request(server)
      .post('/api/v1/task')
      .send(createTaskPayload)
      .auth(token, { type: 'bearer' });
    await request(server)
      .post('/api/v1/task')
      .send(createTaskPayload)
      .auth(token, { type: 'bearer' });

    const response = await request(server)
      .get('/api/v1/task')
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.message).toBe('All task were retrieved!');
    expect(response.body.success).toBeTruthy();
    expect(response.body.result).toBeDefined();
    expect(response.body.result).toBeInstanceOf(Array);
    expect(response.body.result).toHaveLength(3);
  });

  it('Should return 404 when the userID is valid but not associated to at least one register', async () => {
    const userSignUpPayload = {
      username: 'Pedro',
      email: 'pedroafonso@gmail.com',
      weight: 75,
      password: 'password123',
      confirmPassword: 'password123'
    };

    await request(server)
      .post('/api/v1/user/signup')
      .send(userSignUpPayload);

    const userLoginPayload = {
      email: 'pedroafonso@gmail.com',
      password: 'password123'
    };

    const loginResponse = await request(server)
      .post('/api/v1/user/login')
      .send(userLoginPayload);

    const { token } = loginResponse.body.data;

    const response = await request(server)
      .get('/api/v1/task')
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
    expect(response.body.error.message).toBe('The user have no task registered!');
    expect(response.body.success).toBeFalsy();
  });

  it('Should return 404 when the userID is valid but not associated to at least one register', async () => {
    const userSignUpPayload = {
      username: 'Pedro',
      email: 'pedroafonso@gmail.com',
      weight: 75,
      password: 'password123',
      confirmPassword: 'password123'
    };

    await request(server)
      .post('/api/v1/user/signup')
      .send(userSignUpPayload);

    const userLoginPayload = {
      email: 'pedroafonso@gmail.com',
      password: 'password123'
    };

    const loginResponse = await request(server)
      .post('/api/v1/user/login')
      .send(userLoginPayload);

    const { token } = loginResponse.body.data;

    const response = await request(server)
      .get('/api/v1/task')
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
    expect(response.body.error.message).toBe('The user have no task registered!');
    expect(response.body.success).toBeFalsy();
  });

});