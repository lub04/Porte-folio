const Joi = require("joi");

const skillSchema = Joi.object({
  project_id: Joi.number().integer().required().messages({
    "number.base": "L'identifiant du projet doit être un nombre.",
    "number.integer": "L'identifiant du projet doit être un entier.",
    "any.required": "L'identifiant du projet est requis.",
  }),
  skill_id: Joi.number().integer().required().messages({
    "number.base": "L'identifiant de la compétence doit être un nombre.",
    "number.integer": "L'identifiant de la compétence doit être un entier.",
    "any.required": "Veuillez sélectionner une compétence.",
  }),
});

// Middleware de validation
const validateSkill = (req, res, next) => {
  const { error } = skillSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res
      .status(400)
      .json({ errors: error.details.map((err) => err.message) });
  }

  return next();
};
module.exports = validateSkill;
