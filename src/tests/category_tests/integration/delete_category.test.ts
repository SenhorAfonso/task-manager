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

describe('Chech task\'s delete route http responses', () => {
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
      .delete('/api/v1/category/id');

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(response.body.error.message).toBe('Unauthenticated!');
    expect(response.body.success).toBeFalsy();

  });

  it('Should return 400 when the id format is invalid', async () => {
    const token = serverConfig.TEST_TOKEN_1!;

    const response = await request(server)
      .delete('/api/v1/category/invalid')
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.error.message).toBe('The format of the id "invalid" is invalid!');
    expect(response.body.success).toBeFalsy();

  });

  it('Should return 404 when the id is valid but not existent', async () => {
    const token = serverConfig.TEST_TOKEN_1!;
    const fakeId = '6611eccbd8916833bd4e4369';

    const response = await request(server)
      .delete(`/api/v1/category/${fakeId}`)
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
    expect(response.body.error.message).toBe(`The id "${fakeId}" is not associated with any element!`);
    expect(response.body.success).toBeFalsy();

  });

  it('Should return 401 when the user dont own the category', async () => {
    const tokenUser1 = serverConfig.TEST_TOKEN_1!;
    const tokenUser2 = serverConfig.TEST_TOKEN_2!;

    const createCategoryPayload = {
      name: 'Graduation',
      color: 'Red'
    };

    const categoryUser1Id = await TestUtils.createCategory(tokenUser1, createCategoryPayload);

    const response = await request(server)
      .delete(`/api/v1/category/${categoryUser1Id}`)
      .auth(tokenUser2, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(response.body.error.message).toBe('You do not have permissions to delete this category!');
    expect(response.body.success).toBeFalsy();

  });

  it('Should return 200 when the route is authenticated and the id is valid', async () => {
    const token = serverConfig.TEST_TOKEN_1!;

    const createCategoryPayload = {
      name: 'Graduation',
      color: 'Red'
    };

    const categoryId = await TestUtils.createCategory(token, createCategoryPayload);

    const response = await request(server)
      .delete(`/api/v1/category/${categoryId}`)
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.message).toBe('Category deleted successfully!');
    expect(response.body.success).toBeTruthy();

  });

  it('Should return 500 when the database is not connected', async () => {
    await mongoose.connection.close();
    const token = serverConfig.TEST_TOKEN_1!;

    const response = await request(server)
      .delete('/api/v1/category/6611eccbd8916833bd4e4369')
      .auth(token, { type: 'bearer' });

    await mongoose.connect(mongoURI);
    expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body.error.message).toBe('An internal server error ocurred. Please try again later.');
    expect(response.body.success).toBeFalsy();

  });

});