const {isValidObjectId} = require('mongoose');

const {statusCodesEnum} = require('../configs');
const {errorMessagesEnum} = require('../errors');

module.exports = {
    isDataValid: (validator, validatorName, validationDataIn) => (req, res, next) => {
        try {
            const {error, value} = validator[validatorName].validate(req[validationDataIn]);

            if (error) {
                return next({
                    message: error.details[0].message,
                    status: statusCodesEnum.BAD_REQUEST_400
                });
            }

            req[validationDataIn] = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    isIdValid: (item_id) => (req, res, next) => {
        try {
            const {[item_id]: current_id} = req.params;

            if (!isValidObjectId(current_id)) {
                return next({
                    message: errorMessagesEnum.NOT_VALID_ID,
                    status: statusCodesEnum.BAD_REQUEST_400
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    },

};
