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
        website_location_name: DataTypes.INTEGER,
        date_sold: DataTypes.DATE,
        fees: DataTypes.DECIMAL(8,2),
        towing_company: DataTypes.STRING,
        icon_photo: DataTypes.STRING,
        photo1_filenames: DataTypes.JSON
    },{
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });
    Vehicle_history.associate = function (models) {
        Vehicle_history.belongsTo(models.vehicle_info,{
            foreignKey: 'lot_id',
            onDelete: 'CASCADE'
        })
    };
    Vehicle_history.associate = function (models) {
        Vehicle_history.hasMany(models.vehicle_report, {
            foreignKey: 'vehicle_history_id',
            onDelete: 'CASCADE'
        })
    };
    return Vehicle_history;
};
