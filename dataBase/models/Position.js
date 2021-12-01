const {DataTypes} = require('sequelize');

const {positionCategoriesEnum, positionLevelsEnum} = require('../../configs');

module.exports = (client) => {
    const Position = client.define(
        'Position',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                validate: {
                    isInt: true
                }
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isIn: [Object.values(positionCategoriesEnum)]
                }
            },
            level: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isIn: [Object.values(positionLevelsEnum)]
                }
            },
            japaneseRequired: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                validate: {
                    isBoolean: true
                }
            },
            company: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isString: true
                }
            },
            description: {
                type: DataTypes.STRING,
                validate: {
                    isString: true
                }
            }
        },
        {
            tableName: 'positions',
            timestamps: false
        }
    );

    return Position;
};
