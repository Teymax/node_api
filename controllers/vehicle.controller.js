const { throwError, to, error, success } = require('../utils/requestHelpers');
const authService = require('../services/auth.service');
const jwt = require('jsonwebtoken');
const { vehicles } = require('../models');

exports.getVehicles = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let start_date = req.query.start_date;
    let last_date = req.query.last_date;
    let search_field = req.query.search_field;
    let search_param = req.query.search_param;

    if (start_date) {
        findByStartDate(start_date, res);
        if (last_date) {
            findByDate(start_date, last_date, res);
            if (search_field && search_param) {
                findByDateParams(start_date, last_date, search_field, search_param, res);
            }
        }
        if (search_field && search_param) {
            findByStartDateParams(start_date, search_field, search_param, res);
        }
    } else throwError("no date selected", true);
}

const findByStartDate = async (start_date, res) => {
    await to(vehicles.findAll({where: {date: start_date}}).then(
        vehiclesInfo => {
            return success(res, {
                vehicles: vehiclesInfo,
            }, 200);
        })
        .catch(err => throwError(err.message, true)))
};

const findByDate = async (start_date, last_date, res) => {
    await to(vehicles.findAll({where: {date: { "$between": [start_date, last_date]} } }).then(
        vehiclesInfo => {
            return success(res, {
                vehicles: vehiclesInfo,
            }, 200);
        })
        .catch(err => throwError(err.message, true)))
};

const findByStartDateParams = async (start_date, search_field, search_param) => {
    await to(vehicles.findAll({where: {date: start_date, [search_field]: search_param} }).then(
        vehiclesInfo => {
            return success(res, {
                vehicles: vehiclesInfo,
            }, 200);
        })
        .catch(err => throwError(err.message, true)));
};

const findByDateParams = async (start_date, last_date, search_field, search_param) => {
    await to(vehicles.findAll({where: {date: {"$between": [start_date, last_date]}, [search_field]: search_param} }).then(
        vehiclesInfo => {
            return success(res, {
                vehicles: vehiclesInfo,
            }, 200);
        })
        .catch(err => throwError(err.message, true)))
};