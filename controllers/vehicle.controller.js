const { to, error, success } = require('../utils/requestHelpers');
const authService = require('../services/auth.service');
const jwt = require('jsonwebtoken');
const { vehicles } = require('../models');

exports.getVehicles = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { body } = req;
    vehicles.findAll().then(
        vehiclesInfo => {
            return success(res, {
                vehicles: vehiclesInfo,
            }, 200);
        })
};