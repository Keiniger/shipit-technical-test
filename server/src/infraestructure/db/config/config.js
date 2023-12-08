require('dotenv').config();

module.exports = {
  development: {
    username: String(process.env.POSTGRES_USER),
    password: String(process.env.POSTGRES_PASSWORD),
    database: String(process.env.POSTGRES_DB),
    host: '127.0.0.1',
    dialect: 'postgres',
  },
};
