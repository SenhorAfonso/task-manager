import Joi from 'joi';
import request from 'supertest';
import server from '../server';

class TestUtils {

  static validateObject(
    validationSchema: Joi.ObjectSchema,
    target: object
  ) {
    const res = validationSchema.validate(target, { abortEarly: false });
    return res;
  }

  static async createCategory(token: string, payload: any): Promise<void> {
    const response = await request(server)
      .post('/api/v1/category')
      .send(payload)
      .auth(token, { type: 'bearer' });

    return response.body.result._id;
  }

  static async creatTask(token: string, payload: any): Promise<string> {
    const response = await request(server)
      .post('/api/v1/task')
      .send(payload)
      .auth(token, { type: 'bearer' });

    const taksID = response.body.result._id;
    return taksID;
  }

}

export default TestUtils;