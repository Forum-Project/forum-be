// library imports
// a 1 liner short cut for creating a router with express
const router = require('express').Router();
const bcrypt = require('bcryptjs') // Bcryptjs is better for us to use because it is available in more places than bcrypt which is native to C++

// middlware imports
const generateToken = require('../middleware/generateToken')

// model imports 
const Users = require('../models/users-model');

// routes 

// ======================== GET Requests ===========================

// get list of all users (admin only)
router.get('/', (req, res) => {

    Users.find()
        .then(docs => {
            res.status(200).json({ data: docs });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

// get user by id
router.get('/:_id', (req, res) => {
    const { _id } = req.params;

    Users.findById(_id)
        .then(docs => {
            res.status(200).json({ data: docs });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

// ======================== POST Requests ==========================

// add a user
router.post('/', (req, res) => {
    let temp = req.body;
    const hash = bcrypt.hashSync(user.password, 12)
    temp.password = hash;

    const user = new Users(temp);

    // saving the user to the users collection
    user.save()
        .then(user => {
            res.status(201).json({ data: user })
        })
        .catch(err => {
            res.status(500).json({ error: `${err}` })
        });
});


//Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    user.findOne({ email: email })
        .then(user => {
            //If the password matches after going through the hash continue
            if (user && bcrypt.compareSync(password, user.password)) {
                // Create a token
                const token = generateToken(user)

                res.status(200).json({ message: 'Welcome', token });
            }
            else {
                error('Wrong Information', 401, res)
            }
        })
        .catch(err => {
            error(err, 500, res)
        })
})

//Logout
router.get('/logout', (req, res) => {
    //Check for a current session in progress and then end it with a destroy method
    if (req.session) {
        //Destroy session by setting it to null
        req.session.destroy
        //End the response to close
        res.send('Otsukare Sama Desu!')
    }
    //If a session doesn't exist notify the user to login
    else {
        res.send('Gomen!*Smoke Bomb*')
    }
})
// ======================== PUT Requests ===========================

// update specific user information 
router.put('/:_id', (req, res) => {
    const { _id } = req.params;

    Users.findByIdAndUpdate(_id, req.body)
        .then(updatedUser => {
            res.status(204).json({ data: updatedUser });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

// ======================== DELETE Requests ========================

// delete user by id
router.delete('/:_id', (req, res) => {
    const { _id } = req.params;

    Users.findByIdAndRemove(_id)
        .then(deletedUser => {
            res.status(204).json({ data: { message: `User deleted successfully.`, deletedUser } });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

module.exports = router;