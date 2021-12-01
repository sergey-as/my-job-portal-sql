const Joi = require('joi');

const commonValidators = require('./common.validators');

const createPositionValidator = Joi.object({
    category: commonValidators.categoryValidator.required(),
    level: commonValidators.levelValidator.required(),
    japaneseRequired: commonValidators.japaneseValidator.required(),
    company: Joi.string().required(),
    description: Joi.string(),
});

const getPositionsValidator = Joi.object({
    category: commonValidators.categoryValidator,
    level: commonValidators.levelValidator,
    japaneseRequired: commonValidators.japaneseValidator,
    company: Joi.string(),
    tag: Joi.string(),
});

const patchPositionValidator = Joi.object({
    category: Joi.forbidden(),
    level: Joi.forbidden(),
    japaneseRequired: commonValidators.japaneseValidator,
    company: Joi.forbidden(),
    description: Joi.string(),
});

module.exports = {
    createPositionValidator,
    getPositionsValidator,
    patchPositionValidator
};
