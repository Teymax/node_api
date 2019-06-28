const { throwError, to, error, success } = require('../utils/requestHelpers');
const authService = require('../services/auth.service');
const jwt = require('jsonwebtoken');
const { vehicles } = require('../models');

exports.getVehicles = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let start_date = req.query.start_date;
    let end_date = req.query.end_date;
    let search_field = req.query.search_field;
    let search_param = req.query.search_param;

    if (!(start_date) && !(end_date) && !(search_field) && !(search_param)) await to(vehicles.findAll().then(
        vehiclesInfo => {
            return success(res, {
                vehicles: vehiclesInfo,
            }, 200);
        })
        .catch(err => throwError(err.message, true)));
    if (start_date && !(end_date) && !(search_field) && !(search_param)) await findByStartDate(start_date, res);
    if (start_date && end_date && !(search_field) && !(search_param)) await findByDate(start_date, end_date, res);
    if (start_date && !(end_date) && search_field && search_param) await findByStartDateParams(start_date, search_field, search_param, res);
    if (start_date && end_date && search_field && search_param) await findByDateParams(start_date, end_date, search_field, search_param, res);
    else throwError("no date selected", true);
}

const findByStartDate = async (start_date, res) => {
    await to(vehicles.findAll({where: {date: start_date} }).then(
        vehiclesInfo => {
            return success(res, {
                vehicles: vehiclesInfo,
            }, 200);
        })
        .catch(err => throwError(err.message, true)))
};

const findByDate = async (start_date, end_date, res) => {
    await to(vehicles.findAll({where: {date: start_date, end_date} }).then(
        vehiclesInfo => {
            return success(res, {
                vehicles: vehiclesInfo,
            }, 200);
        })
        .catch(err => throwError(err.message, true)))
};

const findByStartDateParams = async (start_date, search_field, search_param, res) => {
    await to(vehicles.findAll({where: {date: start_date, [search_field]: search_param} }).then(
        vehiclesInfo => {
            return success(res, {
                vehicles: vehiclesInfo,
            }, 200);
        })
        .catch(err => throwError(err.message, true)));
};

const findByDateParams = async (start_date, end_date, search_field, search_param, res) => {
    await to(vehicles.findAll({where: {date: [start_date, end_date], [search_field]: search_param} }).then(
        vehiclesInfo => {
            return success(res, {
                vehicles: vehiclesInfo,
            }, 200);
        })
        .catch(err => throwError(err.message, true)))
};