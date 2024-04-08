const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const labSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    index_number: {
        type: String,
        required: true
    }
});

const lab = mongoose.model('lab', labSchema);
module.exports = lab;