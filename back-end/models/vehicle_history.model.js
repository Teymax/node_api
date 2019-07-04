module.exports = (sequelize, DataTypes) => {
    let Vehicle_history = sequelize.define('vehicle_history', {
        date: DataTypes.DATE,
        location: DataTypes.STRING,
        towing_company: DataTypes.STRING
    });
    Vehicle_history.associate = function (models) {
        Vehicle_history.belongsTo(models.vehicle_info,{
            foreignKey: 'vehicle_id',
            onDelete: 'CASCADE'
        })
    };
    Vehicle_history.associate = function (models) {
        Vehicle_history.hasOne(models.vehicle_photos,{
            foreignKey: 'vehicle_history_id',
            onDelete: 'CASCADE'
        })
    };
    return Vehicle_history;
};
