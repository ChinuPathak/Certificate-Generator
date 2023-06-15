const mongoose = require('mongoose');
const {Schema} = mongoose;

const adminSchema = new Schema({
    name: String,
    password: String,
});

module.exports = new mongoose.model('admin', adminSchema);