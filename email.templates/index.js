const {emailActionsEnum} = require('../configs');

module.exports = {
    [emailActionsEnum.POSITION_CREATED]: {
        templateName: 'positionCreated',
        subject: 'Hello! Position for you was created!'
    },

    [emailActionsEnum.POSITION_DELETED]: {
        templateName: 'positionDeleted',
        subject: 'Hello! Position for you was deleted!'
    },

};
