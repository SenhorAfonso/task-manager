import Joi from 'joi';

const MIN_NAME_LENGTH = 5;

class ValidateCategory {

  static createCategory() {
    const createCategoryValidator = Joi.object({
      name: Joi.string()
        .min(MIN_NAME_LENGTH)
        .required(),

      color: Joi.string()
        .valid('Green', 'Yellow', 'Orange', 'Red', 'Pink', 'Purple', 'Gray', 'Cyan', 'Blue')
        .required(),
    });

    return createCategoryValidator;
  }

  static updateCategory() {
    const updateCategoryValidator = Joi.object({
      name: Joi.string()
        .min(MIN_NAME_LENGTH)
        .required(),

      color: Joi.string()
        .valid('Green', 'Yellow', 'Orange', 'Red', 'Pink', 'Purple', 'Gray', 'Cyan', 'Blue')
        .required(),
    });

    return updateCategoryValidator;
  }

}

export default ValidateCategory;