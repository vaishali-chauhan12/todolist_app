const mysql = require("mysql");
const config = require("../config")

const connection = mysql.createConnection(config.db);

connection.connect(function (error) {
  if (error) {
    console.error("Error connecting: " + error);
    return;
  }

  console.log("Connected as id " + connection.threadId);
});

module.exports = connection;
