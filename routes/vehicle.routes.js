import express from 'express';
const router = express.Router();
const VehicleController = require('../controllers/vehicle.controller');
const passport = require('passport');
require('../middleware/passport')(passport);

//todo: redirects after successfull auth strategy
router.get('/vehicles', /*passport.authenticate('jwt', {failureFlash: 'Invalid credentials'},*/ VehicleController.getVehicles);

module.exports = router;
