const router = require('express')
    .Router();

const {
    dataInEnum: {BODY, QUERY},
    validatorsNameEnum: {
        CREATE_POSITION_VALIDATOR,
        GET_POSITIONS_VALIDATOR,
        PATCH_POSITION_VALIDATOR
    }
} = require('../configs');
const {positionController} = require('../controllers');
const {commonMiddleware, positionMiddleware} = require('../middlewares');
const {positionValidator} = require('../validators');

router.get(
    '/',
    // commonMiddleware.isDataValid(positionValidator, GET_POSITIONS_VALIDATOR, QUERY),
    positionController.getPositions
);

router.post(
    '/',
    commonMiddleware.isDataValid(positionValidator, CREATE_POSITION_VALIDATOR, BODY),
    positionController.createPosition
);

router.get(
    '/:position_id',
    commonMiddleware.isIdValid('position_id'),
    positionMiddleware.isPositionByIdPresent,
    positionController.getPositionById
);

router.patch(
    '/:position_id',
    commonMiddleware.isIdValid('position_id'),
    commonMiddleware.isDataValid(positionValidator, PATCH_POSITION_VALIDATOR, BODY),
    positionMiddleware.isPositionByIdPresent,
    positionController.patchPositionById
);

router.delete(
    '/:position_id',
    commonMiddleware.isIdValid('position_id'),
    positionMiddleware.isPositionByIdPresent,
    positionController.deletePositionById
);

module.exports = router;
