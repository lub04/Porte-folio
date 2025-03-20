const Joi = require("joi");

const validateProject = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(255).required(),
    github_link: Joi.string().required(),
    project_category_id: Joi.number().required(),
    team: Joi.string().allow("").optional(),
    website_link: Joi.string().allow(null, "").optional(),
    status_id: Joi.number().required(),
    main_technologies: Joi.string().max(255).required(),
    description: Joi.string().required(),
    organization: Joi.string().required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error == null) {
    next();
  } else {
    res.status(422).json({ validationErrors: error.details });
  }
};

module.exports = validateProject;
