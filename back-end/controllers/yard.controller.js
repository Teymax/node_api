const { to, error, success } = require('../utils/requestHelpers');
import { vehicle_info as Vehicle_info } from '../models';
import { vehicle_history as Vehicle_history } from '../models';
import { vehicle_photos as Vehicle_photos } from '../models';
const Op = require('sequelize').Op;


const sold = async(req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    let today = new Date(); // Today!
    const response = vehicles.map(vehicle => {
        vehicle.dataValues['history'] = histories.filter(history => history.vehicle_id === vehicle.id).map(history => {
            history.dataValues['photos'] = photos.filter(photo => photo.vehicle_history_id === history.id);
            return history
        });
        return vehicle;
    });
    return success(res, response);
};