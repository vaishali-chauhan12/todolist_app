require("dotenv").config();
const fs = require('fs');
const path = require("path");

let config = {
  saltRounds: 10,
  db: {
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
  },
};
if(process.env.BUILD_ENV === "PROD"){
  const caFilePath = path.join(__dirname, "../");
  config.db.ssl = {       
    ca : fs.readFileSync(caFilePath + '/ca.pem'),
  }
}
module.exports = config;
