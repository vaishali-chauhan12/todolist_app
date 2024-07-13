const express = require("express");
const router = express.Router();
const resetPassword = require("../services/reset-password");

router.post("/forgotPassword", async function (req, res, next) {
  try {
    resetPassword.forgotPassword(req, res);
  } catch (err) {
    console.error(`Error while sending mail`, err.message);
    next(err);
  }
});

router.post("/resetPassword", function (req, res, next) {
  try {
    resetPassword.updatePassword(req, res);
  } catch (err) {
    console.error(`Error while updating password `, err.message);
    next(err);
  }
});

module.exports = router;
