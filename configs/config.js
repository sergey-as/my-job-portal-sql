module.exports = {
    LISTEN_CONNECTION_PORT: process.env.LISTEN_CONNECTION_PORT || 5000,
    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/my-job-portal',

    NO_REPLY_EMAIL_USER: process.env.NO_REPLY_EMAIL_USER,
    NO_REPLY_EMAIL_PASS: process.env.NO_REPLY_EMAIL_PASS,

    SQL_USER: process.env.SQL_USER || 'root',
    SQL_PASSWORD: process.env.SQL_PASSWORD || 'root',
    SQL_DB: process.env.SQL_DB || 'my-job-portal-sql',

};
