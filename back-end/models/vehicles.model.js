module.exports = (sequelize, DataTypes) => {
    let Vehicle = sequelize.define('vehicles', {
        date: DataTypes.DATE,
        time: DataTypes.TIME,
        lot_number: DataTypes.STRING,
        license_plate: DataTypes.STRING,
        type: DataTypes.STRING,
        make: DataTypes.STRING,
        model: DataTypes.STRING,
        year: DataTypes.STRING,
        color: DataTypes.STRING,
        location: DataTypes.STRING,
        towing_company: DataTypes.STRING
    });
    Vehicle.associate = function (models) {
        Vehicle.hasOne(models.vehicle_photos,{
            foreignKey: 'vehicle_id',
            as: 'vehicle_photos'
        });
        Vehicle.hasMany(models.history,{
            foreignKey: 'vehicle_id',
            as: 'history_date'
        })
    };
    return Vehicle;
};
