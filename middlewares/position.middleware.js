const {statusCodesEnum} = require('../configs');
const {Position} = require('../dataBase');
const {errorMessagesEnum} = require('../errors');

module.exports = {
    isPositionByIdPresent: async (req, res, next) => {
        try {
            const {position_id} = req.params;

            const positionById = await Position.findById(position_id);

            if (!positionById) {
                return next({
                    message: errorMessagesEnum.POSITION_NOT_FOUND,
                    status: statusCodesEnum.NOT_FOUND_404
                });
            }

            req.position = positionById;
            next();
        } catch (e) {
            next(e);
        }
    },
};
