const {statusCodesEnum} = require('../configs');
const {Applicant} = require('../dataBase');
const {errorMessagesEnum} = require('../errors');

module.exports = {

    isApplicantNotPresent: async (req, res, next) => {
        try {
            const {email} = req.body;
            const applicantByEmail = await Applicant.findOne({email})
                .lean();

            if (applicantByEmail) {
                return next({
                    message: errorMessagesEnum.APPLICANT_ALREADY_EXISTS,
                    status: statusCodesEnum.FORBIDDEN_403
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isApplicantByIdPresent: async (req, res, next) => {
        try {
            const {applicant_id} = req.params;

            const applicantById = await Applicant.findById(applicant_id);

            if (!applicantById) {
                return next({
                    message: errorMessagesEnum.APPLICANT_NOT_FOUND,
                    status: statusCodesEnum.NOT_FOUND_404
                });
            }

            req.applicant = applicantById;
            next();
        } catch (e) {
            next(e);
        }
    },

};
