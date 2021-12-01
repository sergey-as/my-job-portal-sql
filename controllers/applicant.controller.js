const {statusCodesEnum} = require('../configs');
const {Applicant} = require('../dataBase');

module.exports = {
    getAllApplicants: async (req, res, next) => {
        try {
            const applicants = await Applicant.find();

            req.applicants = applicants.map(applicant => applicant.normalize());

            res.json(req.applicants);
        } catch (e) {
            next(e);
        }
    },

    createApplicant: async (req, res, next) => {
        try {
            const createdApplicant = await Applicant.create(req.body);

            req.applicant = createdApplicant.normalize();
            res.status(statusCodesEnum.CREATED_201)
                .json(req.applicant);
        } catch (e) {
            next(e);
        }
    },

    putApplicantById: async (req, res, next) => {
        try {
            const putApplicant = await Applicant.findOneAndUpdate(req.applicant, req.body, {new: true});

            req.applicant = putApplicant.normalize();
            res.json(req.applicant)
                .status(statusCodesEnum.OK_200);
        } catch (e) {
            next(e);
        }
    },

    deleteApplicantById: async (req, res, next) => {
        try {
            await Applicant.deleteOne(req.applicant);

            res.sendStatus(statusCodesEnum.NO_CONTENT_204);
        } catch (e) {
            next(e);
        }
    },

};
