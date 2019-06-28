'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('vehicles', [
      {
        date: '2019-06-17 00:00:00',
        time: '07:30:00',
        lot_number: '',
        license_plate: '8GDB424',
        type: 'SUV',
        make: 'Nissan',
        model: '',
        color: 'Black',
        location: 'location123',
        towing_company: 'D & K',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        date: '2019-06-18 00:00:00',
        time: '07:30:00',
        lot_number: '',
        license_plate: '4RVW314',
        type: 'Sedan',
        make: 'Honda Civic',
        model: '2001',
        color: 'Grey',
        location: 'location123',
        towing_company: 'D & K',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        date: '2019-06-19 00:00:00',
        time: '07:30:00',
        lot_number: '39690119',
        license_plate: '7EVB650',
        type: 'Sedan',
        make: 'Chevrolet Malibu',
        model: '2007',
        color: 'Black',
        location: 'location123',
        towing_company: 'D & K',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('vehicles', null, {});
  }
};
