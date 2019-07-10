import { throwError, to } from '../utils/requestHelpers';
import bcryptjs from 'bcryptjs'

module.exports = (sequelize, DataTypes) => {
  let Model = sequelize.define('user', {
    user_image: DataTypes.STRING,
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: 'Invalid email' }
      }
    },
    password: DataTypes.STRING,
    refresh_token: DataTypes.STRING
  },{
    charset: 'utf8',
        collate: 'utf8_unicode_ci'
  });

  Model.beforeSave(async user => {
    if (user.changed('password')){
      let salt, hash, err;
      [err, salt] = await to(bcryptjs.genSalt(10));
      if (err) throwError(err.message, true);
      [err, hash] = await to(bcryptjs.hash(user.password, salt));
      if (err) throwError(err.message, true);
      user.password = hash;
    }
  });

  Model.prototype.comparePassword = async function (pw) {
    let err, pass;
    if(!this.password) throwError('password not set', true);
    [err, pass] = await to(bcryptjs.compare(pw, this.password));
    if(err) throwError(err.message, true);
    if(!pass) throwError('invalid password', true);
    return this;
  };

  Model.associate = function (models) {
    Model.hasMany(models.vehicle_report,{
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    })
  };
  return Model;
};
