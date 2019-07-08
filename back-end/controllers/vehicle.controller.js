const { to, error, success } = require('../utils/requestHelpers');
import { vehicle_info as Vehicle_info } from '../models';
import { vehicle_history as Vehicle_history } from '../models';
const Op = require('sequelize').Op;

exports.getVehicles = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const {start_date, end_date, search_field, search_param} = req.query;
    let err, vehicles, histories;
    let last_date = new Date(end_date);
    last_date.setDate(last_date.getDate() + 1);
    if (search_field !== 'location' && search_field !== 'towing_company' && search_field !== '' && search_param !== '') {
        console.log(['not location or company']);
        [err, vehicles] = await to(Vehicle_info.findAll({
            where: {
                'last_seen': {[Op.between]: [start_date, last_date]},
                [search_field]: search_param ? {[Op.like]: `${search_param}`} : ''
            }
        }));
        if (err) return error(res, err.message, 400);
    }
    if (search_field === '' || search_param === '') {
        console.log(['null']);
        [err, vehicles] = await to(Vehicle_info.findAll({
            where: {
                'last_seen': {[Op.between]: [start_date, last_date]},
            }
        }));
        if (err) return error(res, err.message, 400);
    }
    if (search_field === 'location' || search_field === 'towing_company') {
        console.log(['location or company']);
        [err, vehicles] = await to(Vehicle_info.findAll({
            where: {
                'last_seen': {[Op.between]: [start_date, last_date]},
            }
        }));
        if (err) return error(res, err.message, 400);
        [err, histories] = await to(Vehicle_history.findAll({
            where: {
                'lot_id': {[Op.in]: vehicles.map((item) => item.lot_number)},
                'date': {[Op.in]: vehicles.map((item) => item.last_seen)},
                [search_field]: search_param ? {[Op.like]: `${search_param}`} : ''
            }
        }));
    } else {
        [err, histories] = await to(Vehicle_history.findAll({
            where: {
                'lot_id': {[Op.in]: vehicles.map((item) => item.lot_number)},
                'date': {[Op.in]: vehicles.map((item) => item.last_seen)},
            }
        }));
    }
    if (err) return error(res, err.message, 400);

    const response = vehicles.map(vehicle => {
        vehicle.dataValues['history'] = histories.filter(history => history.lot_id === vehicle.lot_number);
        return vehicle;
    });
    return success(res, response);
};
