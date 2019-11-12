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
            res.status(200).json({ data: docs });
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
            res.status(200).json({ data: docs });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

// ======================== POST Requests ==========================

// add a comment
router.post('/', (req, res) => {
    const Comments = new Comments({
        //body structure for created user
        comments: req.body.comments,

    });

    // saving the comment to the users collection
    Comments.save()
        .then(comment => {
            res.status(201).json({ data: user })
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
            res.status(204).json({ data: updatedComments });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

// ======================== DELETE Requests ========================

// delete user comment
router.delete('/:_body', (req, res) => {
    const { body } = req.params;

    Comments.findByIdAndRemove(body)
        .then(deletedComment => {
            res.status(204).json({ data: { message: `Comment deleted successfully.`, deletedComment } });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}); 