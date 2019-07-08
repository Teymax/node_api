const { to, error, success } = require('../utils/requestHelpers');
import {user as User, vehicle_info as Vehicle_info} from '../models';
import { report as Report } from '../models';
const Op = require('sequelize').Op;


const report = async(req, res)=>{
    let err, user, vehicle;
    if(!req.report) return error(res, 'report doesn`t set', 400);
    const {body} =req.report;
    if(!body.user_email) return error(res, 'user email doesn`t set', 400);
    if(!body.vehicle_id) return error(res, 'vehicle doesn`t set', 400);
    if(!body.type) return error(res, 'type doesn`t set',400);
    [err, user] = await to(User.findOne({where: {email: body.user_email} }));
    if (err) return error(res, err.message, 400);
    if(!user) return error(res, "no user found!", 400);
    [err, vehicle] = await to(Vehicle_info.findOne({where: {email: body.vehicle_id} }));
    if (err) return error(res, err.message, 400);
    if(!vehicle) return error(res, "vehicle doesn`t exist!", 400);
    let report = new Report();
    report.user_id = user.id;
    report.vehicle_id = vehicle.id;
    report.type = body.type;
    report.note = body.note;
    report.save();
    return success(res, report);
};

exports.report = report;
