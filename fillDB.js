let config = {
    host    : 'localhost',
    user    : 'root',
    password: 'admin',
    database: 'aptonomy'
};

let mysql = require('mysql');
let connection = mysql.createConnection(config);

let sql = `INSERT INTO vehicles('date', 'time', 'lot_number', 'license_plate', 'type', 'make', 'model', 'color', 'location', 'towing_company', 'createdAt', 'updatedAt') 
            VALUES('2019-06-17 00:00:00','07:30:00','','8GDB424','SUV','Nissan','','Black','location123','D & K', '2019-06-17 00:00:00', '2019-06-17 00:00:00')`;
connection.query(sql);

let sql1 = `INSERT INTO vehicles('date', 'time', 'lot_number', 'license_plate', 'type', 'make', 'model', 'color', 'location', 'towing_company', 'createdAt', 'updatedAt')
            VALUES('2019-06-17 00:00:00','07:30','','4RVW314','Sedan','Honda Civic','2001','Grey','location123','D & K', '2019-06-17 00:00:00', '2019-06-17 00:00:00')`;
connection.query(sql1);

let sql2 = `INSERT INTO vehicles('date', 'time', 'lot_number', 'license_plate', 'type', 'make', 'model', 'color', 'location', 'towing_company', 'createdAt', 'updatedAt')
            VALUES('2019-06-17 00:00:00','09:16','39690119','7EVB650','Sedan','Chevrolet Malibu','2007','Black','location123','D & K', '2019-06-17 00:00:00', '2019-06-17 00:00:00')`;
connection.query(sql2);

let sql3 = `INSERT INTO vehicles('date', 'time', 'lot_number', 'license_plate', 'type', 'make', 'model', 'color', 'location', 'towing_company', 'createdAt', 'updatedAt')
            VALUES('2019-06-17 00:00:00','09:43','','','Pickup','Dodge Ram','','Purple','location123','D & K', '2019-06-17 00:00:00', '2019-06-17 00:00:00')`;
connection.query(sql3);

let sql4 = `INSERT INTO vehicles('date', 'time', 'lot_number', 'license_plate', 'type', 'make', 'model', 'color', 'location', 'towing_company', 'createdAt', 'updatedAt')
            VALUES('2019-06-17 00:00:00','10:31','','7YFC771','Sedan','Nissan Sentra','2017','Black','location123','PORTILLO', '2019-06-17 00:00:00', '2019-06-17 00:00:00')`;
connection.query(sql4);

let sql5 = `INSERT INTO vehicles('date', 'time', 'lot_number', 'license_plate', 'type', 'make', 'model', 'color', 'location', 'towing_company', 'createdAt', 'updatedAt')
            VALUES('2019-06-17 00:00:00','10:38','','6ZLR025','Sedan','Nissan Rogue','2011','Yellow','location123','PORTILLO', '2019-06-17 00:00:00', '2019-06-17 00:00:00')`;
connection.query(sql5);

let sql6 = `INSERT INTO vehicles('date', 'time', 'lot_number', 'license_plate', 'type', 'make', 'model', 'color', 'location', 'towing_company', 'createdAt', 'updatedAt')
            VALUES('2019-06-17 00:00:00','10:38','','7AVE721','Sedan','Saturn SL','1999','White','location123','PORTILLO', '2019-06-17 00:00:00', '2019-06-17 00:00:00')`;
connection.query(sql6);

let sql7 = `INSERT INTO vehicles('date', 'time', 'lot_number', 'license_plate', 'type', 'make', 'model', 'color', 'location', 'towing_company', 'createdAt', 'updatedAt')
            VALUES('2019-06-17 00:00:00','10:53','38917799','8FSW305','Sedan','Honda Civic','1997','blue','location123','PORTILLO', '2019-06-17 00:00:00', '2019-06-17 00:00:00')`;
connection.query(sql7);

let sql8 = `INSERT INTO vehicles('date', 'time', 'lot_number', 'license_plate', 'type', 'make', 'model', 'color', 'location', 'towing_company', 'createdAt', 'updatedAt')
            VALUES('2019-06-17 00:00:00','11:28','39560609','AM123','Pickup','Chevrolet Colorado','2006','Blue','location123','D & K', '2019-06-17 00:00:00', '2019-06-17 00:00:00')`;
connection.query(sql8);

let sql9 = `INSERT INTO vehicles('date', 'time', 'lot_number', 'license_plate', 'type', 'make', 'model', 'color', 'location', 'towing_company', 'createdAt', 'updatedAt')
            VALUES('2019-06-17 00:00:00','12:46','','AM123','SUV','Jeep','','Black','location123','PORTILLO', '2019-06-17 00:00:00', '2019-06-17 00:00:00')`;
connection.query(sql9);

connection.end();