module.exports = (sequelize, DataTypes) => {
    let Vehicle_info = sequelize.define('vehicle_info', {
        lot_number: DataTypes.STRING,
        license_plate: DataTypes.STRING,
        type: DataTypes.STRING,
        make: DataTypes.STRING,
        model: DataTypes.STRING,
        year: DataTypes.STRING,
        color: DataTypes.STRING,
        last_seen: DataTypes.STRING
    },{
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });
    Vehicle_info.associate = function (models) {
        Vehicle_info.hasOne(models.vehicle_photos,{
            foreignKey: 'vehicle_id',
            as: 'vehicle_photos'
        });
        Vehicle_info.hasMany(models.vehicle_history,{
            foreignKey: 'vehicle_id',
            as: 'vehicle_history'
        })
    };
    return Vehicle_info;
};
