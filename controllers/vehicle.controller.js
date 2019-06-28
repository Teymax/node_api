const { throwError, to, error, success } = require('../utils/requestHelpers');
const { vehicles } = require('../models');

exports.getVehicles = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { start_date, end_date, search_field, search_param } = req.query;
    let params = {
      where: {}
    };
    if (start_date) {
      params.where['date'] = end_date ? {"$between": [start_date, end_date]} : start_date;
    }
    if (search_field) {
      params.where[search_field] = search_param;
    }
    return success(res, params);
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