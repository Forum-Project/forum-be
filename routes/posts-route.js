// library imports
// a 1 liner short cut for creating a router with express
const router = require('express').Router();

// middlware imports

// model imports 
const Posts = require('../models/posts-model');
const Comments = require('../models/comments-model')

// routes 

// ======================== GET Requests ===========================

// get list of all posts (admin only)
router.get('/', (req, res) => {

    Posts.find()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

// get post by id
router.get('/:_id', (req, res) => {
    const { _id } = req.params;

    Posts.findById(_id)
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

// get all comments from specific post
router.get('/:_id/comments', (req, res) => {
    const { _id } = req.params;

    Comments.find({ post_id: _id })
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

// ======================== POST Requests ==========================

// add a post
router.post('/', (req, res) => {
    const post = new Posts({
        //body structure for created post
        post_title: req.body.post_title,
        post_body: req.body.post_body,
        post_date: req.body.post_date,
        post_tags: req.body.post_tags,
        post_category: req.body.post_category,
        // // where do you come from
        user_id: req.body.user_id
    });

    // saving the post to the Posts collection
    post.save()
        .then(post => {
            res.status(201).json(post)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        });
});

// ======================== PUT Requests ===========================

// update specific post information 
router.put('/:_id', (req, res) => {
    const { _id } = req.params;

    Posts.findByIdAndUpdate(_id, req.body)
        .then(OGPost => {
            Posts.findById(_id)
                .then(updatedPost => {
                    res.status(202).json(updatedPost);
                })
                .catch(err => {
                    res.status(500).json({ error: err });
                });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

// ======================== DELETE Requests ========================

// delete post by id
router.delete('/:_id', (req, res) => {
    const { _id } = req.params;

    Posts.findByIdAndRemove(_id)
        .then(deletedPost => {
            res.status(204).json({ message: `Post deleted successfully.`, deletedPost });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

module.exports = router;