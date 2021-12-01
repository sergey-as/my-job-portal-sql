const {Applicant} = require('../dataBase');

module.exports = {
    getApplicants: (filters = {}) => {

        const findObject = {};

        Object.keys(filters)
            .forEach((filterParam) => {
                switch (filterParam) {
                    case 'category':
                        findObject.categories = filters.category;
                        break;
                    case 'level':
                        findObject.level = filters.level;
                        break;
                    case 'japaneseRequired':
                        if (filters.japaneseRequired) {
                            findObject.japaneseKnowledge = filters.japaneseRequired;
                        }
                        break;
                }
            });

        return Applicant.find(findObject);
    }
};
