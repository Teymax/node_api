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
    const array = [...vehicles];
    const response = array.map(item => {
      histories = histories.map(history => {
        console.log(history)
        history.dataValues['photos'] = photos.filter(photo => photo.vehicle_history_id === history.id);
        return history;
      });
      item.dataValues['history'] = histories;
      return item;
    });
    return success(res, response);
  }
};