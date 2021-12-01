
const db = require('../../dataBase/MySQL')
    .getInstance();

module.exports = {
    findAll: () => {
        const Student = db.getModel('Student');

        return Student.findAll();
    },

    createStudent: (userObject) => {
        const Student = db.getModel('Student');

        return Student.create(userObject);
    }
};

module.exports = {
    getAllPositions: (filters = {}) => {
        const findObject = {};

        Object.keys(filters)
            .forEach((filterParam) => {
                switch (filterParam) {
                    case 'category':
                        findObject.category = filters.category;
                        break;
                    case 'company':
                        findObject.company = {$regex: `${filters.company}`, $options: 'i'};
                        break;
                    case 'japaneseRequired':
                        findObject.japaneseRequired = filters.japaneseRequired;
                        break;
                    case 'level':
                        findObject.level = filters.level;
                        break;
                    case 'tag':
                        findObject.description = {$regex: `${filters.tag}`, $options: 'i'};
                        break;
                }
            });

        return Position.find(findObject);
    }
};
