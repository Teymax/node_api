/*'use strict';*/

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const vehicle_info = await queryInterface.sequelize.query(
      `SELECT id from vehicle_infos;`
    );
    const vehicle_info_rows = vehicle_info[0];
    return queryInterface.bulkInsert('vehicle_histories', [
      {
        date: '2019-06-12 11:03:38',
        camera_type: 1,
        customer_id: 020,
        site_id: 001,
        latitude: 100.10,
        longitude: 100.10,
        website_site_id: 1,
        website_location_name: 'website_location',
        fees: 0.15,
        date_sold: '2019-07-01 12:00:00',
        icon_photo: './data/vehicle_photos/020/001/190702/00000392/thumb.jpg',
        photo1_filenames: '[{ "cam1_4k": "./data/vehicle_photos/020/001/190706/00000017/02_4k.jpg", "cam1_p": "./data/vehicle_photos/020/001/190706/00000017/02_p.jpg"}]',
        location_name: 'GATE 1',
        towing_company: 'California Towing',
        lotId: vehicle_info_rows[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        date: '2019-06-15 11:03:38',
        camera_type: 1,
        customer_id: 020,
        site_id: 001,
        latitude: 100.10,
        longitude: 100.10,
        website_site_id: 1,
        website_location_name: 'website_location',
        fees: 0.15,
        date_sold: '2019-07-01 12:00:00',
        icon_photo: './data/vehicle_photos/020/001/190706/00000017/thumb.jpg',
        photo1_filenames: '[{ "cam1_4k": "./data/vehicle_photos/020/001/190706/00000017/01_4k.jpg", "cam1_p": "./data/vehicle_photos/020/001/190706/00000017/01_p.jpg"}]',
        location_name: 'LOT B, A14',
        towing_company: 'Keiths\'sTowing',
        lotId: vehicle_info_rows[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        date: '2019-06-22 11:05:38',
        camera_type: 1,
        customer_id: 020,
        site_id: 001,
        latitude: 100.10,
        longitude: 100.10,
        website_site_id: 1,
        website_location_name: 'website_location',
        fees: 0.15,
        date_sold: '2019-07-01 12:00:00',
        icon_photo: '',
        photo1_filenames: '[{ "cam1_4k": "./data/vehicle_photos/020/001/190706/00000017/02_4k.jpg", "cam1_p": "./data/vehicle_photos/020/001/190706/00000017/02_p.jpg"}]',
        location_name: 'Detail Center C',
        towing_company: 'Seven Star Towing',
        lotId: vehicle_info_rows[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        date: '2019-06-22 11:05:38',
        camera_type: 1,
        customer_id: 020,
        site_id: 001,
        latitude: 100.10,
        longitude: 100.10,
        website_site_id: 1,
        website_location_name: 'website_location',
        fees: 0.15,
        date_sold: '2019-07-01 12:00:00',
        icon_photo: '',
        photo1_filenames: '[{ "cam1_4k": "./data/vehicle_photos/020/001/190702/00000392/02_4k.jpg", "cam1_p": "./data/vehicle_photos/020/001/190702/00000392/02_p.jpg"}]',
        location_name: 'LOT A, G27',
        towing_company: 'Keith\'s Towing',
        lotId: vehicle_info_rows[3].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        date: '2019-06-30 11:07:38',
        camera_type: 1,
        customer_id: 020,
        site_id: 001,
        latitude: 100.10,
        longitude: 100.10,
        website_site_id: 1,
        website_location_name: 'website_location',
        fees: 0.15,
        date_sold: '2019-07-01 12:00:00',
        icon_photo: '',
        photo1_filenames: '[{ "cam1_4k": "./data/vehicle_photos/020/001/190702/00000392/02_4k.jpg", "cam1_p": "./data/vehicle_photos/020/001/190702/00000392/02_p.jpg"}]',
        location_name: 'GATE 1',
        towing_company: 'Marvin\'s Towing',
        lotId: vehicle_info_rows[4].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('vehicle_histories', null, {});
  }
};
