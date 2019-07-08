'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('vehicle_histories', [
      {
        date: '2019-06-18 11:03:38',
        location: 'GATE 1',
        towing_company: 'California Towing',
        vehicle_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        date: '2019-06-17 11:03:38',
        location: 'LOT B, A14',
        towing_company: 'Keiths\'sTowing',
        vehicle_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        date: '2019-06-17 11:05:38',
        location: 'Detail Center C',
        towing_company: 'Seven Star Towing',
        vehicle_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        date: '2019-06-17 11:05:38',
        location: 'LOT A, G27',
        towing_company: 'Keith\'s Towing',
        vehicle_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        date: '2019-06-20 11:07:38',
        location: 'GATE 1',
        towing_company: 'Marvin\'s Towing',
        vehicle_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('vehicle_histories', null, {});
  }
};
