const Joi = require("joi");

const messageSchema = Joi.object({
  user_first_name: Joi.string().max(255).required(),
  user_last_name: Joi.string().max(255).required(),
  message: Joi.string().required(),
  user_email: Joi.string().required(),
});

const validateMessage = (req, res, next) => {
  const { error } = messageSchema.validate(req.body, { abortEarly: false });

  if (error == null) {
    next();
  } else {
    res.status(422).json({ validationErrors: error.details });
  }
};

module.exports = validateMessage;
