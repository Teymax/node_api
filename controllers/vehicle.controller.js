const { to, error, success } = require('../utils/requestHelpers');
import { vehicles as Vehicles } from '../models';
const Op = require('sequelize').Op;

exports.getVehicles = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { start_date, end_date, search_field, search_param } = req.query;
    let err, vehicles;
    let params = {
      where: {}
    };
    if (start_date) {
      params.where['date'] = end_date ? {[Op.between]: [start_date, end_date]} : {[Op.gte]: start_date};
    }
    if (search_field && search_param) {
      if (params.where.date) {
        params.where = Object.assign({}, params.where, {
          [Op.and]: {[search_field]: search_param ? { [Op.like]: `%${search_param}%` } : ''}
        });
      } else {
        params.where = {
          [search_field]: search_param ? { [Op.like]: `%${search_param}%` } : ''
        };
      }
    }
    [err, vehicles] = await to(Vehicles.findAll(params));
    if (err) return error(res, err.message, 400);
    return success(res, {vehicles: vehicles});
};
