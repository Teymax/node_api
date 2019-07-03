const { to, error, success } = require('../utils/requestHelpers');
import { vehicle_info as Vehicle_info } from '../models';
import { vehicle_history as Vehicle_history } from '../models';
import { vehicle_photos as Vehicle_photos } from '../models';
const Op = require('sequelize').Op;

exports.getVehicles = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const {start_date, end_date, search_field, search_param} = req.query;
    let err, vehicles, histories, photos;
    if (start_date && end_date) {
        [err, vehicles] = await to(Vehicle_info.findAll({ where: {'last_seen': {[Op.between]: [start_date, end_date]} } }));
        if (err) return error(res, err.message, 400);
        [err, histories] = await to(Vehicle_history.findAll({where: { 'vehicle_id': {[Op.in]: vehicles.map((item) => item.id)} } }));
        if (err) return error(res, err.message, 400);
        [err, photos] = await to(Vehicle_photos.findAll({where: { 'vehicle_history_id': {[Op.in]: histories.map((item) => item.id)} } }));
        if (err) return error(res, err.message, 400);
        const response = await vehicles.map(item => {
            item['history'] = histories;
            item['photos'] = photos;
            item['malina'] = 'debil';
            return item;
        });
        //console.log(response);
        //console.log(histories);
        //console.log(photos);
        console.log(response);
        console.log(response.map((item) => item.malina));
        //console.log(vehicles.map((item) => item.history));
        return success(res, response);


        /*    let err, vehicles;
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
            if (err) return error(res, egit rr.message, 400);
            return success(res, {vehicles: vehicles});*/
    }
};