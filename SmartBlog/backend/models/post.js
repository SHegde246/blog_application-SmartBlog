//creating mongoose schema
const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    tag: { type: String, required: true },
    content: { type: String, required: true },
    numberofreads: { type: Number, required: true }
});

//creating mongoose model based on schema
module.exports = mongoose.model('Post', postSchema);
