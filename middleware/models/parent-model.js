const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema Parent
const ParentSchema = Schema({
    taskname: String,
});

module.exports = mongoose.model('Parent', ParentSchema);