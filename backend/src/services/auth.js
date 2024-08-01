const connection = require("./connection");
const bcrypt = require("bcrypt");
const config = require("../config")
const NumSaltRounds = Number(config.saltRounds);

const isUniqueEmail = (email) => {
  return new Promise(function (resolve, reject) {
    connection.query(
      "SELECT COUNT(*) AS count FROM user WHERE email = ?",
      [email],
      (err, result1) => {
        if (err) {
          throw err;
        }
        resolve(result1[0].count > 0 ? false : true);
      }
    );
  });
};

const insertUser = async (req, res) => {
  const { username, email, password } = req.body;
  const uniqueEmail = await isUniqueEmail(req.body.email);

  if (!uniqueEmail) {
    return res.json({
      code: "200",
      message: "User with same email already exists",
      resultObj: {},
    });
  }

  const salt = await bcrypt.genSalt(NumSaltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  const sql = "INSERT INTO user (username, email, password) VALUES (?, ?, ?)";
  const values = [username, email, hashedPassword];

  connection.query(sql, values, (err, result) => {
    if (err) {
      throw err;
    }
    if (result.affectedRows) {
      connection.query(
        "INSERT INTO list (title, user_id) VALUES ('Home', ?)",
        [result.insertId],
        (err, listResult) => {
          if (err) {
            throw err;
          }
          if (listResult.affectedRows) {
            const sql =
              "SELECT user_id, username, email FROM user WHERE user_id = ?;";
            const values = [result.insertId];
            connection.query(sql, values, (err, result1) => {
              if (err) {
                throw err;
              }
              return res.json({
                code: "200",
                message: "User Registered Successfully",
                resultObj: { ...result1[0] },
              });
            });
          }
        }
      );
    }
  });
};

const authenticateUser = async (req, res) => {
  const { email, password } = req.body;

  const sql =
    "SELECT user_id, username, email, password FROM user WHERE email = ?";

  connection.query(sql, [email], (err, result) => {
    if (err) {
      throw err;
    }
    let isAuthenticated = false;
    let message = "User does not exists";
    if (result.length) {
      const storedHashedPassword = result[0]?.password;
      bcrypt.compare(password, storedHashedPassword, (err, passwordMatched) => {
        if (err) {
          console.error("dedede");
          message = "Error while authenticating";
          return;
        }
        if (passwordMatched) {
          isAuthenticated = true;
          message = "Passwords match! User authenticated.";
        } else {
          message = "Passwords do not match! Authentication failed.";
        }

        if (isAuthenticated) {
          return res.json({
            code: "200",
            message: "User Verified",
            resultObj: {
              user_id: result[0]?.user_id,
              username: result[0]?.username,
              email: result[0]?.email,
            },
          });
        } else {
          res.json({
            code: "401",
            message: message,
            resultObj: {},
          });
        }
      });
    } else {
      return res.json({
        code: "401",
        message: message,
        resultObj: {},
      });
    }
  });
};

module.exports = {
  authenticateUser,
  insertUser,
};
