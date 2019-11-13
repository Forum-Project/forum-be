const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
    comments_body: String,
    comments_timestamp: Number,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Posts' }

})

const Comments = new mongoose.model('Comments', commentsSchema);

module.exports = Comments; 