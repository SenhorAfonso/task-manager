import Joi from 'joi';

class TestUtils {

  static validateObject(
    validationSchema: Joi.ObjectSchema,
    target: object
  ) {
    const res = validationSchema.validate(target, { abortEarly: false });
    return res;
  }

}

export default TestUtils;