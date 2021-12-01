const Joi = require('joi');

const {positionCategoriesEnum, positionLevelsEnum} = require('../configs');

module.exports = {
    categoryValidator: Joi
        .string()
        .valid(...Object.values(positionCategoriesEnum)),
    levelValidator: Joi
        .string()
        .valid(...Object.values(positionLevelsEnum)),
    japaneseValidator: Joi
        .boolean(),
};
