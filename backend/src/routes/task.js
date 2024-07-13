const express = require("express");
const router = express.Router();
const task = require("../services/task");

router.post('/', async function (req, res, next) {
  try {
    task.insertTask(req, res)
  } catch (err) {
    console.error(`Error while inserting task`, err.message);
    next(err);
  }
})

router.put('/', async function (req, res, next) {
  try {
    task.updateTask(req, res)
  } catch (err) {
    console.error(`Error while updating task`, err.message);
    next(err);
  }
})


router.post('/status', function(req, res, next) {
  try {
    task.updateTaskStatus(req, res)
  } catch (err) {
    console.error(`Error while updating task status`, err.message);
    next(err);
  }
})

router.get('/getAll/:id', function(req, res, next) {
  try {
    task.getAllTasks(req, res)
  } catch (err) {
    console.error(`Error while fetching task`, err.message);
    next(err);
  }
})

router.get('/getNotifications/', function(req, res, next) {
  try {
    task.getNotifications(req, res)
  } catch (err) {
    console.error(`Error while fetching task`, err.message);
    next(err);
  }
})

router.delete('/:id', async function (req, res, next) {
  try {
    task.deleteTask(req, res)
  } catch (err) {
    console.error(`Error while deleting task`, err.message);
    next(err);
  }
})

module.exports = router;
