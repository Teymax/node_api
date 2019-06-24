const router = require('express').Router();

const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

const secret = process.env.JWT_ENCRYPTION;

const passport = require('passport');

router.post('/register', (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if(user){
                let err = 'Current email exists in db.';
                return res.status(400).json(err);
            } else {
                const newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                });
                bcrypt.genSalt(10, (err, salt) => {
                    if(err) throw err;
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => res.status(400).json(err));
                    });
                })
            }
        })
});


router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email })
        .then(user => {
            if(!user) {
                errors.email = "No account found";
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        const payload = {
                            id: user._id,
                            username: user.username
                        };
                        jwt.sign(payload, secret, { expiresIn: 36000 },
                            (err, token) => {
                                if(err) res.status(500)
                                    .json({ error: "Error signing token!",
                                            raw: err });
                                    res.json({
                                        success: true,
                                        token: `Bearer ${token}`});
                            });
                    } else {
                        errors.password = "Password incorrect!";
                        res.status(400).json(errors);
                    }
                })
        })
});


