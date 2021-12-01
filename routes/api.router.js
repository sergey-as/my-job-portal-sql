const router = require('express')
    .Router();

const applicantRouter = require('./applicant.router');
const positionRouter = require('./position.router');

router.use('/applicants', applicantRouter);
router.use('/positions', positionRouter);

module.exports = router;
