import Joi from 'joi';

const MIN_TITLE_LENGTH = 5;
const MIN_DESCRIPTION_LENGTH = 5;

class ValidateTask {

  static createTaks() {
    const createTaskValidator = Joi.object({
      title: Joi.string()
        .min(MIN_TITLE_LENGTH)
        .required(),

      description: Joi.string()
        .min(MIN_DESCRIPTION_LENGTH)
        .required(),

      type: Joi.string()
        .required(),

      category: Joi.string()
        .required()
    });

    return createTaskValidator;
  }

  static updateTask() {
    const updateTaskValidator = Joi.object({
      title: Joi.string()
        .min(MIN_TITLE_LENGTH)
        .required(),

      description: Joi.string()
        .min(MIN_DESCRIPTION_LENGTH)
        .required(),

      type: Joi.string()
        .required(),

      category: Joi.string()
        .required()
    });

    return updateTaskValidator;
  }

}

export default ValidateTask;