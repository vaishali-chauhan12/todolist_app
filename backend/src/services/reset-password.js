// require("dotenv").config();
const express = require("express");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const connection = require("./connection");
const { sendEmail, mailTemplate } = require("../utils/email");
const config = require("../config")

const NumSaltRounds = Number(config.saltRounds);

const getUserByEmail = (email) => {
  return new Promise(function (resolve, reject) {
    connection.query(
      "SELECT user_id, username, email FROM user WHERE email = ?",
      [email],
      (err, result) => {
        if (err) {
          throw err;
        }
        resolve(result);
      }
    );
  });
};

const updateForgotPasswordToken = (userId, resetToken) => {
  const createdAt = new Date().toISOString();
  const expiresAt = new Date(Date.now() + 60 * 60 * 24 * 1000).toISOString();
  const query =
    "INSERT INTO reset_tokens(token, created_at, expires_at, user_id) VALUES(?,?,?,?);";

  return new Promise(function (resolve, reject) {
    connection.query(
      query,
      [resetToken, createdAt, expiresAt, userId],
      (err, result) => {
        if (err) {
          throw err;
        }
        resolve(result);
      }
    );
  });
};

const getResetPasswordToken = (userId) => {
  return new Promise(function (resolve, reject) {
    connection.query(
      "SELECT token, expires_at from reset_tokens WHERE user_id = ? ORDER BY created_at DESC LIMIT 1",
      [userId],
      (err, result) => {
        if (err) {
          throw err;
        }
        resolve(result);
      }
    );
  });
};

const updateResetPasswordToken = (userId) => {
  return new Promise(function (resolve, reject) {
    connection.query(
      "DELETE FROM reset_tokens WHERE user_id = ?;",
      [userId],
      (err, result) => {
        if (err) {
          throw err;
        }
        resolve(result);
      }
    );
  });
};

const forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await getUserByEmail(email);

    if (!user || user.length === 0) {
      return res.json({
        code: "204",
        message: "Your are not registered!",
        resultObj: {},
      });
    } else {
      const token = crypto.randomBytes(20).toString("hex");
      const resetToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
      await updateForgotPasswordToken(user[0].user_id, resetToken);
      const resetPwdLink = `${process.env.FRONTEND_URL}/resetPassword?id=${user[0].user_id}&token=${resetToken}`;
      const mailOption = {
        email: email,
        subject: "Forgot Password Link",
        message: mailTemplate(
          "We have received a request to reset your password. Please reset your password using the link below.",
          resetPwdLink,
          "Reset Password"
        ),
      };
      console.error("resetPwdLink", resetPwdLink);
      await sendEmail(mailOption);
      res.json({
        code: "200",
        message: "A password reset link has been sent to your email.",
        resultObj: {},
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const updatePassword = async (req, res) => {
  try {
    const { password, token, userId } = req.body;
    const userToken = await getResetPasswordToken(userId);
    if (!userToken || userToken.length === 0) {
      return res.json({
        code: "400",
        message: "Some problem occurred!",
        resultObj: {},
      });
    } else {
      const currDateTime = new Date();
      const expiresAt = new Date(userToken[0].expires_at);
      if (currDateTime > expiresAt) {
        return res.json({
          code: "400",
          message: "Reset Password link has expired!",
          resultObj: {},
        });
      } else if (userToken[0].token !== token) {
        return res.json({
          code: "400",
          message: "Reset Password link is invalid!",
          resultObj: {},
        });
      } else {
        const salt = await bcrypt.genSalt(NumSaltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        connection.query(
          "UPDATE user SET password = ? WHERE user_id = ?;",
          [hashedPassword, userId],
          async (err, result) => {
            await updateResetPasswordToken(userId);
            if (err) {
              throw err;
            }
            return res.json({
              code: "200",
              resultObj: {},
              message: "Your password reset was successfully!",
            });
          }
        );
      }
    }
  } catch (error) {
    console.error("resetPassword", error);
  }
};

module.exports = {
  forgotPassword,
  updatePassword,
};
