import Joi from 'joi';

const MIN_USERNAME_LENGHT = 5;
const MIN_WEIGHT_VALUE = 0;

class ValidateUser {

  static registerUser() {
    const registerUserValidator = Joi.object({
      username: Joi.string()
        .min(MIN_USERNAME_LENGHT)
        .trim()
        .required(),

      weight: Joi.number()
        .min(MIN_WEIGHT_VALUE)
        .required(),

      email: Joi.string()
        .email({
          minDomainSegments: 2, tlds: { allow: ['com', 'net'] }
        })
        .required(),

      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{6,30}$/)
        .required(),

      confirmPassword: Joi.string()
        .regex(/^[a-zA-Z0-9]{6,30}$/)
        .required(),

    });

    return registerUserValidator;
  }

  static loginUser() {
    const loginUserValidator = Joi.object({

      email: Joi.string()
        .email({
          minDomainSegments: 2, tlds: { allow: ['com', 'net'] }
        })
        .required(),

      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{6,30}$/)
        .required()

    });

    return loginUserValidator;
  }

}

export default ValidateUser;