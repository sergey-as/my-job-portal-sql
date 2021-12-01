const {emailActionsEnum, statusCodesEnum} = require('../configs');
const {Position} = require('../dataBase');
const {applicantService, emailService, positionService} = require('../service');

module.exports = {
    createPosition: async (req, res, next) => {
        try {
            const createdPosition = await Position.create(req.body);

            req.position = createdPosition.normalize();

            const {category, level, japaneseRequired, positionInfo} = req.position;

            const applicants = await applicantService.getApplicants(
                {category, level, japaneseRequired}
            );

            const promises = applicants.map(async ({email}) => {
                await emailService.sendMail(
                    email,
                    emailActionsEnum.POSITION_CREATED,
                    {positionInfo, userEmail: email}
                );
            });
            await Promise.allSettled(promises);

            res.status(statusCodesEnum.CREATED_201)
                .json(req.position);
        } catch (e) {
            next(e);
        }
    },

    getPositions: async (req, res, next) => {
        try {
            const positions = await positionService.getAllPositions(req.query);

            req.positions = positions.map(position => position.normalize());
            res.json(req.positions);
        } catch (e) {
            next(e);
        }
    },

    getPositionById: (req, res, next) => {
        try {
            const position = req.position;

            req.position = position.normalize();
            res.json(req.position);
        } catch (e) {
            next(e);
        }
    },

    patchPositionById: async (req, res, next) => {
        try {
            const patchedPosition = await Position.findOneAndUpdate(req.position, req.body, {new: true});

            req.position = patchedPosition.normalize();
            res.json(req.position)
                .status(statusCodesEnum.OK_200);
        } catch (e) {
            next(e);
        }
    },

    deletePositionById: async (req, res, next) => {
        try {
            const {category, level, japaneseRequired, positionInfo} = req.position;

            const applicants = await applicantService.getApplicants(
                {category, level, japaneseRequired}
            );

            await Position.deleteOne(req.position);

            const promises = applicants.map(async ({email}) => {
                await emailService.sendMail(
                    email,
                    emailActionsEnum.POSITION_DELETED,
                    {positionInfo, userEmail: email}
                );
            });
            await Promise.allSettled(promises);

            res.sendStatus(statusCodesEnum.NO_CONTENT_204);
        } catch (e) {
            next(e);
        }
    },

};
