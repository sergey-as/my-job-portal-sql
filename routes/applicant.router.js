const router = require('express')
    .Router();

const {
    dataInEnum: {BODY},
    validatorsNameEnum: {
        CREATE_APPLICANT_VALIDATOR,
        PUT_APPLICANT_VALIDATOR
    }
} = require('../configs');
const {applicantController} = require('../controllers');
const {applicantMiddleware, commonMiddleware} = require('../middlewares');
const {applicantValidator} = require('../validators');


router.get(
    '/',
    applicantController.getAllApplicants
);

router.post(
    '/',
    commonMiddleware.isDataValid(applicantValidator, CREATE_APPLICANT_VALIDATOR, BODY),
    applicantMiddleware.isApplicantNotPresent,
    applicantController.createApplicant
);

router.put(
    '/:applicant_id',
    commonMiddleware.isIdValid('applicant_id'),
    commonMiddleware.isDataValid(applicantValidator, PUT_APPLICANT_VALIDATOR, BODY),
    applicantMiddleware.isApplicantByIdPresent,
    applicantController.putApplicantById
);

router.delete(
    '/:applicant_id',
    commonMiddleware.isIdValid('applicant_id'),
    applicantMiddleware.isApplicantByIdPresent,
    applicantController.deleteApplicantById
);

module.exports = router;
