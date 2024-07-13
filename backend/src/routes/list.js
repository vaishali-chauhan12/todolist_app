const express = require("express");
const router = express.Router();
const list = require("../services/list");

router.post('/', async function (req, res, next) {
  try {
    list.insertList(req, res)
  } catch (err) {
    console.error(`Error while inserting list`, err.message);
    next(err);
  }
})

router.put('/', async function (req, res, next) {
  try {
    list.updateList(req, res)
  } catch (err) {
    console.error(`Error while updating list`, err.message);
    next(err);
  }
})

router.delete('/:id', async function (req, res, next) {
  try {
    list.deleteList(req, res)
  } catch (err) {
    console.error(`Error while deleting list`, err.message);
    next(err);
  }
})

router.post('/getAll', function(req, res, next) {
  try {
    list.getAllListByUserId(req, res)
  } catch (err) {
    console.error(`Error while fetching list`, err.message);
    next(err);
  }
})

module.exports = router;
