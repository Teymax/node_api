module.exports = (sequelize, DataTypes) => {
  let Vehicle_history = sequelize.define('vehicle_history', {
    date: DataTypes.DATE,
    camera_type: DataTypes.INTEGER,
    customer_id: DataTypes.INTEGER,
    site_id: DataTypes.INTEGER,
    location_name: DataTypes.STRING,
    latitude: DataTypes.DECIMAL(10,7),
    longitude: DataTypes.DECIMAL(10,7),
    website_site_id: DataTypes.INTEGER,
    website_location_name: DataTypes.STRING,
    date_sold: DataTypes.DATE,
    fees: DataTypes.DECIMAL(8,2),
    towing_company: DataTypes.STRING,
    icon_photo: DataTypes.STRING,
    photo_filenames: {
      type: DataTypes.STRING,
      get: function () {
        return JSON.parse(this.getDataValue('photo_filenames'))
      },
      set: function (value) {
        this.setDataValue('photo_filenames', JSON.stringify(value))
      }
    }
  },{
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  return Vehicle_history;
};
