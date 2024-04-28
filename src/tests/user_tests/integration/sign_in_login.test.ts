import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import StatusCodes from 'http-status-codes';
import userSchema from '../../../user/schema/userSchema';
import server from '../../../server';

let mongoServer: MongoMemoryServer;
let mongoURI: string;

describe('Check user\'s login route\'s http responses', () => {

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    mongoURI = mongoServer.getUri();
    await mongoose.connect(mongoURI);
  });

  afterEach(async () => {
    await userSchema.collection.deleteMany({});
  });

  afterAll(async () => {
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

  it('Should return 200 status code when the email is differente than the registered one', async () => {

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

  it('Should return 404 status code when the password is different than the registered one', async () => {

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
      password: '123password'
    };

    const response = await request(server)
      .post('/api/v1/user/login')
      .send(userLoginPayload);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.success).toBeFalsy();
    expect(response.body.error.message).toBe('The email or password is incorrect!');
  });

  it('Should return 400 status code when the payload is invalid', async () => {
    const userLoginPayload = {
      email: '',
      password: '',
    };

    const response = await request(server)
      .post('/api/v1/user/login')
      .send(userLoginPayload);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.success).toBeFalsy();
    expect(response.body.errors).toBeInstanceOf(Array);
    expect(response.body.errors).toHaveLength(2);

  });

  it('Should return 500 when the database is not connected', async () => {
    await mongoose.connection.close();

    const userSignUpPayload = {
      email: 'pedroafonso@gmail.com',
      password: 'password123'
    };

    const response = await request(server)
      .post('/api/v1/user/login')
      .send(userSignUpPayload);

    await mongoose.connect(mongoURI);
    expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body.error.message).toBe('An internal server error ocurred. Please try again later.');
    expect(response.body.success).toBeFalsy();

  });

});