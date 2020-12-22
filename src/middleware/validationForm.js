const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    fullName: Joi.string().min(6).required(),
    email: Joi.string().min(10).required().email(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(10).required().email(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(data);
};

const postValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(6).required(),
    description: Joi.string().min(6).required(),
    photos: Joi.array().required(),
  });
  return schema.validate(data);
};

const hiredValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(6).required(),
    description: Joi.string().min(6).required(),
    price: Joi.number().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    orderTo: Joi.number().required(),
  });
  return schema.validate(data);
};

const projectValidation = (data) => {
  const schema = Joi.object({
    transactionId: Joi.number().required(),
    description: Joi.string().min(6).required(),
    photos: Joi.array().required(),
  });
  return schema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
  postValidation,
  hiredValidation,
  projectValidation,
};
