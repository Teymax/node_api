'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('vehicle_infos', [
      {
        lot_number: '14170',
        type: 'SUV',
        color: 'White',
        make: 'Renault',
        model: 'Captur',
        year: '2012',
        license_plate: '9CAL185',
        last_seen: '2019-06-12 11:03:38',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        lot_number: '11987',
        type: 'SUV',
        color: 'Black',
        make: 'Toyota',
        model: 'Land Cruiser Prado',
        year: '2018',
        license_plate: '4ACL185',
        last_seen: '2019-06-15 11:03:38',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        lot_number: '10433',
        type: 'Sedan',
        color: 'Blue',
        make: 'Ford',
        model: 'Focus',
        year: '2010',
        license_plate: '9CLA235',
        last_seen: '2019-06-22 11:05:38',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        lot_number: '16555',
        type: 'SUV',
        color: 'Silver',
        make: 'Land Rover',
        model: 'Range Rover II',
        year: '2015',
        license_plate: '8FAL183',
        last_seen: '2019-06-22 11:05:38',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        lot_number: '11008',
        type: 'SUV',
        color: 'Black',
        make: 'Chevrolet',
        model: 'Tahoe IV',
        year: '2018',
        license_plate: '5JKL345',
        last_seen: '2019-06-30 11:07:38',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('vehicle_infos', null, {});
  }
};
