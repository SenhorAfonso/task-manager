import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import StatusCodes from 'http-status-codes';
import userSchema from '../../../user/schema/userSchema';
import server from '../../../server';

let mongoServer: MongoMemoryServer;

describe('Check user\'s login route\'s http responses', () => {

  beforeEach(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoURI = mongoServer.getUri();
    mongoose.connect(mongoURI);
  });

  afterEach(async () => {
    await userSchema.collection.drop();
    await mongoServer.stop();
    await mongoose.connection.close();
  });

  it('Should return 200 status code when the user log-in successfully', async () => {

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

    const response = await request(server)
      .post('/api/v1/user/login')
      .send(userLoginPayload);

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('User successfully logged in');
  });

  it('Should return 200 status code when the user log-in successfully', async () => {

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
      email: 'pedroafonso1@gmail.com',
      password: 'password123'
    };

    const response = await request(server)
      .post('/api/v1/user/login')
      .send(userLoginPayload);

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
    expect(response.body.success).toBeFalsy();
    expect(response.body.error.message).toBe('There is no user with the provided email!');
  });

});