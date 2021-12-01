const {model, Schema} = require('mongoose');

const {positionCategoriesEnum, positionLevelsEnum} = require('../../configs');
const modelDefinition = require('../model.definition');

const applicantSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    categories: {
        type: [String],
        // type: Array(String),
        required: true,
        enum: Object.values(positionCategoriesEnum)
    },
    level: {
        type: String,
        required: true,
        enum: Object.values(positionLevelsEnum)
    },
    japaneseKnowledge: {
        type: Boolean,
        default: false,
        // required: true
    }
}, modelDefinition.schemaOptions);

applicantSchema.methods = {
    normalize() {
        const toNormalize = this.toObject();
        const fieldsToRemove = [
            'createdAt',
            'updatedAt',
            '__v'
        ];

        fieldsToRemove.forEach((field) => {
            delete toNormalize[field];
        });

        return toNormalize;
    }
};

applicantSchema.virtual('skills')
    .get(function() {
        return `Categories: ${this.categories}`+
            ` level: ${this.level}`+
            ` japaneseKnowledge: ${this.japaneseKnowledge}`;
    });

module.exports = model('applicant', applicantSchema);
