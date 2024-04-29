import { MongoMemoryServer } from 'mongodb-memory-server';
import StatusCodes from 'http-status-codes';
import mongoose from 'mongoose';
import request from 'supertest';
import server from '../../../server';
import categorySchema from '../../../category/schema/categorySchema';
import serverConfig from '../../../config/config';
import TestUtils from '../../../utils/testUtils';

let mongoServer: MongoMemoryServer;
let mongoURI: string;

describe('Chech task\'s update route http responses', () => {
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
    const response = await request(server)
      .get('/api/v1/category');

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(response.body.error.message).toBe('Unauthenticated!');
    expect(response.body.success).toBeFalsy();

  });

  it('Should return 200 when the route is authenticated', async () => {
    const token = serverConfig.TEST_TOKEN_1!;
    const createCategoryPayload1 = {
      name: 'Graduation',
      color: 'Red'
    };

    const createCategoryPayload2 = {
      name: 'House',
      color: 'Red'
    };

    await TestUtils.createCategory(token, createCategoryPayload1);
    await TestUtils.createCategory(token, createCategoryPayload2);

    const response = await request(server)
      .get('/api/v1/category')
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.message).toBe('All user\'s categories retrieved successfully!');
    expect(response.body.result).toBeDefined();
    expect(response.body.result).toHaveLength(2);
    expect(response.body.success).toBeTruthy();

  });

  it('Should return 400 when there is no category registered', async () => {
    const token = serverConfig.TEST_TOKEN_1!;

    const response = await request(server)
      .get('/api/v1/category')
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
    expect(response.body.error.message).toBe('There is no category registered!');
    expect(response.body.success).toBeFalsy();

  });

  it('Should return 500 when the database is not connected', async () => {
    await mongoose.connection.close();
    const token = serverConfig.TEST_TOKEN_1!;

    const response = await request(server)
      .get('/api/v1/category')
      .auth(token, { type: 'bearer' });

    await mongoose.connect(mongoURI);
    expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body.error.message).toBe('An internal server error ocurred. Please try again later.');
    expect(response.body.success).toBeFalsy();

  });
});