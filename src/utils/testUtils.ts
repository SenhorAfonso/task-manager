import Joi from 'joi';
import request from 'supertest';
import server from '../server';
import IRegisterNewUser from '../user/DTOs/IRegisterNewUser';

class TestUtils {

  static validateObject(
    validationSchema: Joi.ObjectSchema,
    target: object
  ) {
    const res = validationSchema.validate(target, { abortEarly: false });
    return res;
  }

  static async loginUser(payload: IRegisterNewUser): Promise<string> {
    const { email, password } = payload;
    let token: string = '';

    await request(server)
      .post('/api/v1/user/signup')
      .send(payload);

    const response = await request(server)
      .post('/api/v1/user/login')
      .send({ email, password });

    ({ token } = response.body.data);

    return token;
  }

  static async createCategory(token: string, payload: any): Promise<void> {
    await request(server)
      .post('/api/v1/category')
      .send(payload)
      .auth(token, { type: 'bearer' });
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