// library imports
const router = require('express').Router();

const Categories = require('../models/categories-model');
const Posts = require('../models/posts-model');

router.get('/', (req, res) => {

    Categories.find()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

router.get('/:_id', (req, res) => {
    const { _id } = req.params;

    Categories.findById(_id)
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

router.post('/', (req, res) => {
    const categories = new Categories({
        //body structure for created user
        category_name: req.body.category_name,
    });

    // saving the user to the Categories collection
    categories.save()
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        });
});

router.put('/:_id', (req, res) => {
    const { _id } = req.params;

    Categories.findByIdAndUpdate(_id, req.body)
        .then(updatedCategory => {
            res.status(204).json(updatedCategory);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

router.delete('/:_id', (req, res) => {
    const { _id } = req.params;

    Categories.findByIdAndRemove(_id)
        .then(deletedCategory => {
            res.status(204).json({ message: `Category deleted successfully.`, deletedCategory });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});



// How to grab a Post by Category
// get post by id
router.get('/:id/posts', (req, res) => {
    const { id } = req.params;
    let tags;
    if(req.query && req.query.tags) tags = req.query.tags.split(' ');
    let findOptions = { post_category: id };
    if(Array.isArray(tags)) findOptions.post_tags = { $in: tags};
    console.log(findOptions);
    Posts.find(findOptions)
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

module.exports = router;