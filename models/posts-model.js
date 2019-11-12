const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
    post_title: Number,
    post_body: Number,
    post_date: Number,
    post_comments: Number,
    post_category: Number,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },

})

const Posts = new mongoose.model('Posts', postsSchema);

module.exports = Posts; 