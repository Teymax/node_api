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
        last_seen: '2019-06-18 11:03:38',
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
        last_seen: '2019-06-17 11:03:38',
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
        last_seen: '2019-06-17 11:05:38',
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
        last_seen: '2019-06-17 11:05:38',
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
        last_seen: '2019-06-20 11:07:38',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        lot_number: '22754',
        type: 'Other',
        color: 'White',
        make: 'GMC',
        model: 'Sierra',
        year: '2016',
        license_plate: '1KDF185',
        last_seen: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        lot_number: '19876',
        type: 'Sedan',
        color: 'Blue',
        make: 'Ford',
        model: 'Focus',
        year: '2018',
        license_plate: '5CBV135',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        lot_number: '11543',
        type: 'SUV',
        color: 'Silver',
        make: 'Land Rover',
        model: 'Range Rover II',
        year: '2016',
        license_plate: '9CDE875',
        last_seen: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        lot_number: '27654',
        type: 'SUV',
        color: 'White',
        make: 'Renault',
        model: 'Captur',
        year: '2018',
        license_plate: '2CAL885',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        lot_number: '10984',
        type: 'Other',
        color: 'Black',
        make: 'GMC',
        model: 'Sierra',
        year: '2014',
        license_plate: '5KAL875',
        last_seen: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        lot_number: '17623',
        type: 'SUV',
        color: 'White',
        make: 'Renault',
        model: 'Captur',
        year: '2018',
        license_plate: '3CAL985',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        lot_number: '14170',
        type: 'SUV',
        color: 'White',
        make: 'Renault',
        model: 'Captur',
        year: '2018',
        license_plate: '7JAL195',
        last_seen: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        lot_number: '11229',
        type: 'Sedan',
        color: 'BLue',
        make: 'Ford',
        model: 'Focus',
        year: '2010',
        license_plate: '1NBL145',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        lot_number: '13332',
        type: 'SUV',
        color: 'Black',
        make: 'Toyota',
        model: 'Land Cruiser Prado',
        year: '2018',
        license_plate: '2CML342',
        last_seen: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        lot_number: '17623',
        type: 'SUV',
        color: 'Black',
        make: 'Chevrolet',
        model: 'Tahoe IV',
        year: '2018',
        license_plate: '9HTL225',
        last_seen: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('vehicle_infos', null, {});
  }
};
