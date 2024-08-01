require("dotenv").config();

const config = {
  saltRounds: 10,
  db: {
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABSE_USER,
    password: process.env.DATABSE_PASSWORD,
  },
};
module.exports = config;
