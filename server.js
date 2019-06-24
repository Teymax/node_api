import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from './utils/logger';
import passport from 'passport';

require('dotenv').config();

const { DB_NAME } = process.env;
const app = express();
const models = require('./models');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize());

const port = process.env.PORT || 9000;

process.on('unhandledRejection', error => {
  logger.error(error.message);
});

// connect to database
models.sequelize.authenticate()
  .then(() => {
    logger.info(`Connected to database: ${DB_NAME}`)
  })
  .catch(err => {
    logger.error(`Unable to connect to SQL database: ${DB_NAME}`);
    logger.error(err.message);
  });
if (process.env.NODE_ENV === 'development') {
  models.sequelize.sync();
}

app.listen(port, () => {
  logger.info(`Server start on port ${port}`)
});

