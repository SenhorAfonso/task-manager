import { MongoMemoryServer } from 'mongodb-memory-server';
import StatusCodes from 'http-status-codes';
import mongoose from 'mongoose';
import request from 'supertest';
import server from '../../../server';
import categorySchema from '../../../category/schema/categorySchema';
import serverConfig from '../../../config/config';

let mongoServer: MongoMemoryServer;
let mongoURI: string;

describe('Chech category\'s create route http responses', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    mongoURI = mongoServer.getUri();
    await mongoose.connect(mongoURI);
  });

  afterEach(async () => {
    await categorySchema.collection.deleteMany({});
  });

  afterAll(async () => {
    await mongoServer.stop();
    await mongoose.connection.close();
  });

  it('Should return 401 when the route is not authenticated', async () => {
    const createCategoryPayload = {
      name: 'Graduation',
      color: 'Red'
    };

    const response = await request(server)
      .post('/api/v1/category')
      .send(createCategoryPayload);

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

    const response = await request(server)
      .post('/api/v1/category')
      .send(createCategoryPayload)
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.body.message).toBe('Category successfully created!');
    expect(response.body.success).toBeTruthy();
  });

  it('Should return 400 when the category name already exist', async () => {
    const token = serverConfig.TEST_TOKEN_1!;
    const createCategoryPayload = {
      name: 'Graduation',
      color: 'Red'
    };

    await request(server)
      .post('/api/v1/category')
      .send(createCategoryPayload)
      .auth(token, { type: 'bearer' });

    const response = await request(server)
      .post('/api/v1/category')
      .send(createCategoryPayload)
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.error.message).toBe('The category already exist!');
    expect(response.body.success).toBeFalsy();
  });

  it('Should return 500 when the database is not connected', async () => {
    await mongoose.connection.close();
    const token = serverConfig.TEST_TOKEN_1!;

    const createCategoryPayload = {
      name: 'Graduation',
      color: 'Red'
    };

    const response = await request(server)
      .post('/api/v1/category')
      .send(createCategoryPayload)
      .auth(token, { type: 'bearer' });

    await mongoose.connect(mongoURI);
    expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body.error.message).toBe('An internal server error ocurred. Please try again later.');
    expect(response.body.success).toBeFalsy();

  });

});