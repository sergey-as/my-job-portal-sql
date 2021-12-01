const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const {
    config: {NO_REPLY_EMAIL_USER, NO_REPLY_EMAIL_PASS},
    statusCodesEnum
} = require('../configs');
const emailTemplates = require('../email.templates');
const {ErrorHandler, errorMessagesEnum} = require('../errors');

const templateParser = new EmailTemplates({
    views: {
        // root: path.join(process.cwd(), 'email.templates')
        root: path.join(__dirname, '..', 'email.templates')
    }
});

const transporter = nodemailer.createTransport({
    // host: 'smtp.gmail.com',
    // port: 465,
    // secure: true,
    // ---or---
    service: 'gmail',
    auth: {
        user: NO_REPLY_EMAIL_USER,
        pass: NO_REPLY_EMAIL_PASS
    }
});

const sendMail = async (userEmail, emailAction, context = {}) => {
    const templateInfo = emailTemplates[emailAction];

    if (!templateInfo) {
        throw new ErrorHandler(
            errorMessagesEnum.WRONG_TEMPLATE_NAME,
            statusCodesEnum.INTERNAL_SERVER_ERROR_500
        );
    }

    const contentHtml = await templateParser.render(templateInfo.templateName, context);

    return transporter.sendMail({
        from: NO_REPLY_EMAIL_USER,
        // to: userEmail,
        to: NO_REPLY_EMAIL_USER,
        subject: templateInfo.subject,
        html: contentHtml
    });
};

module.exports = {
    sendMail
};
