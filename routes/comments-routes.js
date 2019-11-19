const router = require('express').Router();

// middlware imports

// model imports 
const Comments = require('../models/comments-model');

// routes 

// ======================== GET Requests ===========================

// get list of all comments (admin only)
router.get('/', (req, res) => {

    Comments.find()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

// get comments by id
router.get('/:_id', (req, res) => {
    const { _id } = req.params;

    Comments.findById(_id)
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

// ======================== POST Requests ==========================

// add a comment
router.post('/', (req, res) => {
    const comments = new Comments({
        //body structure for created user
        comments_body: req.body.comments_body,
        comments_timestamp: req.body.comments_timestamp,
        user_id: req.body.user_id,
        post_id: req.body.post_id

    });

    // saving the comment to the users collection
    comments.save()
        .then(comment => {
            res.status(201).json(comment)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        });
});

// ======================== PUT Requests ===========================

// update specific comment 
router.put('/:_id', (req, res) => {
    const { body } = req.params;

    Comments.findByIdAndUpdate(_id, req.body)
        .then(updatedComment => {
            res.status(204).json(updatedComment);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

// ======================== DELETE Requests ========================

// delete user comment
router.delete('/:_id', (req, res) => {
    const { _id } = req.params;

    Comments.findByIdAndRemove(_id)
        .then(deletedComment => {
            res.status(204).json({ message: `Comment deleted successfully.`, deletedComment });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

module.exports = router;