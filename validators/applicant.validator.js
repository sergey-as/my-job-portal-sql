const Joi = require('joi');

const {constants} = require('../configs');
const commonValidators = require('./common.validators');

const forRequiredApplicantValidator = {
    email: Joi
        .string()
        .regex(constants.EMAIL_REGEXP)
        .trim()
        .required(),
    categories: Joi.array().items(commonValidators.categoryValidator.required()),
    level: commonValidators.levelValidator.required()
};

const createApplicantValidator = Joi.object({
    ...forRequiredApplicantValidator,
    japaneseKnowledge: commonValidators.japaneseValidator,
});

const putApplicantValidator = Joi.object({
    ...forRequiredApplicantValidator,
    japaneseKnowledge: commonValidators.japaneseValidator.required(),
});

module.exports = {
    createApplicantValidator,
    putApplicantValidator,
};
