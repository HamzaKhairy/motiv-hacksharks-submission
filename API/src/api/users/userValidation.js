const Joi = require('joi');

/**
 * Validates the registration data.
 * @param {Object} data - The data to be validated.
 * @returns {Object} - The result of the validation.
 */
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  });
  return schema.validate(data);
};

module.exports = {
  registerValidation
};
