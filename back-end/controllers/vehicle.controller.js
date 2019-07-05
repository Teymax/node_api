const { to, error, success } = require('../utils/requestHelpers');
import { vehicle_info as Vehicle_info } from '../models';
import { vehicle_history as Vehicle_history } from '../models';
import { vehicle_photos as Vehicle_photos } from '../models';
const Op = require('sequelize').Op;

exports.getVehicles = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const {start_date, end_date, search_field, search_param} = req.query;
    let err, vehicles, histories, photos;
    let last_date = new Date(end_date); // Today!
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
                'vehicle_id': {[Op.in]: vehicles.map((item) => item.id)},
                'date': {[Op.in]: vehicles.map((item) => item.last_seen)},
                [search_field]: search_param ? {[Op.like]: `${search_param}`} : ''
            }
        }));
    } else {
        [err, histories] = await to(Vehicle_history.findAll({
            where: {
                'vehicle_id': {[Op.in]: vehicles.map((item) => item.id)},
                'date': {[Op.in]: vehicles.map((item) => item.last_seen)},
            }
        }));
    }
    if (err) return error(res, err.message, 400);
    [err, photos] = await to(Vehicle_photos.findAll({where: {'vehicle_history_id': {[Op.in]: histories.map((item) => item.id)}}}));
    if (err) return error(res, err.message, 400);
    const response = vehicles.map(vehicle => {
        vehicle.dataValues['history'] = histories.filter(history => history.vehicle_id === vehicle.id).map(history => {
            history.dataValues['photos'] = photos.filter(photo => photo.vehicle_history_id === history.id);
            return history
        });
        return vehicle;
    });
    return success(res, response);
};
