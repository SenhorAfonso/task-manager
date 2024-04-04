import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import StatusCodes from 'http-status-codes';
import userSchema from '../../../user/schema/userSchema';
import server from '../../../server';

let mongoServer: MongoMemoryServer;

describe('Check user\'s sign-up route\'s http response', () => {

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoURI = mongoServer.getUri();
    await mongoose.connect(mongoURI);
  });

  afterAll(async () => {
    await userSchema.collection.drop();
    await mongoServer.stop();
    await mongoose.connection.close();
  });

  it('Should return 200 status code when the payload is valid', async () => {
    const userSignUpPayload = {
      username: 'Pedro',
      email: 'pedroafonso@gmail.com',
      weight: 75,
      password: 'password123',
      confirmPassword: 'password123'
    };

    const response = await request(server)
      .post('/api/v1/user/signup')
      .send(userSignUpPayload);

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('User successfully registered!');

  });

});