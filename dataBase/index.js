const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');

const {config: {SQL_DB, SQL_PASSWORD, SQL_USER}} = require('../configs');

module.exports = (() => {
    let instance;

    const initConnection = () => {
        const connection = new Sequelize(SQL_DB, SQL_USER, SQL_PASSWORD, {dialect: 'mysql'});

        const models = {};
        const modelsPath = path.join(process.cwd(), 'dataBase', 'models');
        console.log(modelsPath);

        const getModels = () => {
            fs.readdir(modelsPath, (err, files) => {
                files.forEach((file) => { // Position.js
                    const [model] = file.split('.'); // [Position, js]
                    const modelFile = require(path.join(modelsPath, model)); // ./dataBase/models/Position

                    models[model] = modelFile(connection);
                });
            });
        };

        return {
            setModels: () => getModels(),
            getModel: (modelName) => models[modelName]
        };
    };

    return {
        getInstance: () => {
            if (!instance) {
                instance = initConnection();
            }

            return instance;
        }
    };
})();
