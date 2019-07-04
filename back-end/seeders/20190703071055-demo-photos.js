'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('vehicle_photos', [
      {
        thumbnail: 'thumbnail',
        cam1_hd: 'cam1_hd',
        cam2_hd: 'cam2_hd',
        cam3_hd: 'cam3_hd',
        cam4_hd: 'cam4_hd',
        cam1_4k: 'cam1_4k',
        cam2_4k: 'cam2_4k',
        cam3_4k: 'cam3_4k',
        cam4_4k: 'cam4_4k',
        vehicle_history_id: 1,
        vehicle_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        thumbnail: 'thumbnail',
        cam1_hd: 'cam1_hd',
        cam2_hd: 'cam2_hd',
        cam3_hd: 'cam3_hd',
        cam4_hd: 'cam4_hd',
        cam1_4k: 'cam1_4k',
        cam2_4k: 'cam2_4k',
        cam3_4k: 'cam3_4k',
        cam4_4k: 'cam4_4k',
        vehicle_history_id: 2,
        vehicle_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        thumbnail: 'thumbnail',
        cam1_hd: 'cam1_hd',
        cam2_hd: 'cam2_hd',
        cam3_hd: 'cam3_hd',
        cam4_hd: 'cam4_hd',
        cam1_4k: 'cam1_4k',
        cam2_4k: 'cam2_4k',
        cam3_4k: 'cam3_4k',
        cam4_4k: 'cam4_4k',
        vehicle_history_id: 3,
        vehicle_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        thumbnail: 'thumbnail',
        cam1_hd: 'cam1_hd',
        cam2_hd: 'cam2_hd',
        cam3_hd: 'cam3_hd',
        cam4_hd: 'cam4_hd',
        cam1_4k: 'cam1_4k',
        cam2_4k: 'cam2_4k',
        cam3_4k: 'cam3_4k',
        cam4_4k: 'cam4_4k',
        vehicle_history_id: 4,
        vehicle_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        thumbnail: 'thumbnail',
        cam1_hd: 'cam1_hd',
        cam2_hd: 'cam2_hd',
        cam3_hd: 'cam3_hd',
        cam4_hd: 'cam4_hd',
        cam1_4k: 'cam1_4k',
        cam2_4k: 'cam2_4k',
        cam3_4k: 'cam3_4k',
        cam4_4k: 'cam4_4k',
        vehicle_history_id: 5,
        vehicle_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('vehicle_photos', null, {});
  }
};
