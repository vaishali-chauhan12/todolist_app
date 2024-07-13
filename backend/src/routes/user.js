const express = require("express");
const router = express.Router();
const auth = require("../services/auth");

router.post('/signup', async function (req, res, next) {
  try {
    auth.insertUser(req, res)
  } catch (err) {
    console.error(`Error while registering user`, err.message);
    next(err);
  }
})

router.post('/login', function(req, res, next) {
  try {
    auth.authenticateUser(req, res)
  } catch (err) {
    console.error(`Error while authenticating user `, err.message);
    next(err);
  }
})

module.exports = router;
