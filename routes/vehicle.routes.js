import express from 'express';
const router = express.Router();
const VehicleController = require('../controllers/vehicle.controller');
const passport = require('passport');
require('../middleware/passport')(passport);

router.get('/list', passport.authenticate('jwt', {session:false}), VehicleController.getVehicles);

module.exports = router;
