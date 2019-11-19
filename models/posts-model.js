const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
    post_title: String,
    post_body: String,
    post_date: Number,
    post_tags: Array,
    post_category: { type: mongoose.Schema.Types.ObjectId, ref: 'Categories' },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
})

const Posts = new mongoose.model('Posts', postsSchema);

module.exports = Posts; 