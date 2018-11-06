const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InstitutionSchema = new Schema({
    name: String,
    URL: {
        type: String,
        unique: true
    },
    emailDomain: {
        type: String,
        unique: true,
        required: true
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'book'
    }]
});

const Institution = mongoose.model('institution', InstitutionSchema);

module.exports = Institution;