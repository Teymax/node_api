import express from 'express';
const router = express.Router();
const YardController = require('../controllers/yard.controller');
const passport = require('passport');
require('../middleware/passport')(passport);

router.post('/report', passport.authenticate('jwt', {session:false}), YardController.report);

module.exports = router;