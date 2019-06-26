const { throwError, to, error, success } = require('../utils/requestHelpers');
const authService = require('../services/auth.service');
const jwt = require('jsonwebtoken');
const { vehicles } = require('../models');

exports.getVehicles = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    if(req.query.date) {
        vehicles.findAll({where: { date: req.query.date}}).then(
            vehiclesInfo => {
                return success(res, {
                    vehicles: vehiclesInfo,
                }, 200);
            })
            .catch(err => throwError(err.message, true))
    } else throwError("no date selected", true)
};