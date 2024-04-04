import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import StatusCodes from 'http-status-codes';
import userSchema from '../../../user/schema/userSchema';
import server from '../../../server';

let mongoServer: MongoMemoryServer;

describe('Check user\'s sign-up route\'s http response', () => {

  beforeEach(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoURI = mongoServer.getUri();
    await mongoose.connect(mongoURI);
  });

  afterEach(async () => {
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

    expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('User successfully registered!');

  });

  it('Should return 400 status code when the passwords dont\'t match', async () => {
    const userSignUpPayload = {
      username: 'Pedro',
      email: 'pedroafonso@gmail.com',
      weight: 75,
      password: 'password123',
      confirmPassword: '123password'
    };

    const response = await request(server)
      .post('/api/v1/user/signup')
      .send(userSignUpPayload);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.success).toBeFalsy();
    expect(response.body.error.message).toBe('The passwords do not match!');
  });

  it('Should return 400 status code when the email is already registered', async () => {
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

    const response = await request(server)
      .post('/api/v1/user/signup')
      .send(userSignUpPayload);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.success).toBeFalsy();
    expect(response.body.error.message).toBe('The email entered is already registered!');

  });

  it('Should return 400 status code when the payload is invalid', async () => {
    const userSignUpPayload = {
      username: '',
      email: '',
      weight: 0,
      password: '',
      confirmPassword: ''
    };

    const response = await request(server)
      .post('/api/v1/user/signup')
      .send(userSignUpPayload);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.success).toBeFalsy();
    expect(response.body.errors).toBeInstanceOf(Array);
    expect(response.body.errors).toHaveLength(5);

  });

});