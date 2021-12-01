const express = require('express');
require('dotenv').config();

const {config, statusCodesEnum} = require('./configs');
const {apiRouter} = require('./routes');

const db = require('./dataBase').getInstance();

const app = express();

db.setModels();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', apiRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || statusCodesEnum.INTERNAL_SERVER_ERROR_500)
        .json({
            msg: err.message
        });
});

app.listen(config.LISTEN_CONNECTION_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`app listen ${config.LISTEN_CONNECTION_PORT}`);
});
