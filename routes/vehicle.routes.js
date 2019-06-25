import express from 'express';
const router = express.Router();
const VehicleController = require('../controllers/vehicle.controller');
import passport from 'passport';

router.get('/vehicles', /*passport.authenticate('jwt', {session: false},*/ VehicleController.getVehicles);

module.exports = router;
