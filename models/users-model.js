const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    user_avatar: String,
    user_posts: { type: mongoose.Schema.Types.ObjectId, ref: 'Posts' },
    user_comments: { type: mongoose.Schema.Types.ObjectId, ref: 'Comments' },
    user_permission: { type: Number, default: 1 },
})

const Users = new mongoose.model('Users', userSchema); 

module.exports = Users; 