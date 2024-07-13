const moment = require("moment");
const connection = require("./connection");

const addTaskListMapping = (taskId, listId) => {
  return new Promise(function (resolve, reject) {
    const sql =
      "INSERT INTO task_list_mapping (task_id, list_id) VALUES (?, ?);";
    connection.query(sql, [taskId, listId], (err, resultObj) => {
      if (err) {
        throw err;
      }
      resolve();
    });
  });
};

const insertTask = async (req, res) => {
  const { title, details, listId, status, scheduled_at } = req.body;

  const scheduledDate = scheduled_at
    ? moment.utc(scheduled_at).local().format("YYYY-MM-DD")
    : null;
  const sql =
    "INSERT INTO task (title, details, status, scheduled_at) VALUES (?, ?, ?, ?);";
  const values = [title, details, status, scheduledDate];

  connection.query(sql, values, async (err, result) => {
    if (err) {
      throw err;
    }
    if (result.affectedRows) {
      await addTaskListMapping(result.insertId, listId);
      const sql =
        "SELECT id, title, details, status, scheduled_at FROM task WHERE is_deleted = 0 AND id = ?;";
      connection.query(sql, [result.insertId], (err, resultObj) => {
        if (err) {
          throw err;
        }
        return res.json({
          code: "200",
          message: "Task Created Successfully",
          resultObj: { ...resultObj[0] },
        });
      });
    }
  });
};

const getAllTasks = (req, res) => {
  const { id } = req.params;
  const sql =
    "SELECT id, title, details, status, scheduled_at FROM task INNER JOIN task_list_mapping ON task_list_mapping.task_id = task.id WHERE is_deleted = 0 AND task_list_mapping.list_id = ? ORDER BY updated_at DESC;";

  connection.query(sql, [id], (err, result) => {
    if (err) {
      throw err;
    }
    return res.json({
      code: "200",
      message: "",
      resultObj: result,
    });
  });
};

const updateTaskStatus = async (req, res) => {
  console.error("updateTask", req);
  const { id, status } = req.body;

  const sql = "UPDATE task SET status = ? WHERE id = ?;";

  connection.query(sql, [status, id], (err, result) => {
    if (err) {
      throw err;
    }
    if (result.affectedRows) {
      return res.json({
        code: "200",
        message: "Task Status Updated Successfully",
        resultObj: {},
      });
    }
  });
};

const updateTask = async (req, res) => {
  const { id, title, details, status, scheduled_at } = req.body;
  const scheduledDate = scheduled_at
    ? moment.utc(scheduled_at).local().format("YYYY-MM-DD")
    : null;

  const sql =
    "UPDATE task SET title = ?, details = ?, status = ?, scheduled_at = ? WHERE id = ?;";

  connection.query(
    sql,
    [title, details, status, scheduledDate, id],
    (err, result) => {
      if (err) {
        throw err;
      }
      if (result.affectedRows) {
        return res.json({
          code: "200",
          message: "Task Updated Successfully",
          resultObj: {},
        });
      }
    }
  );
};

const deleteTask = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM task WHERE id = ?";

  connection.query(sql, [id], (err, result) => {
    if (err) {
      throw err;
    }
    if (result.affectedRows) {
      const sql = "DELETE FROM task_list_mapping WHERE task_id = ?";
      connection.query(sql, [id], (err, resultObj) => {
        if (err) {
          throw err;
        }
        return res.json({
          code: "200",
          message: "",
          resultObj: "Task deleted successfully",
        });
      });
    }
  });
};

getNotifications = (req, res) => {
  const { id } = req.params;
  const sql =
    "SELECT task.id as taskId, task.title as taskTitle, list.title as listTitle, list.id as listId, scheduled_at FROM task INNER JOIN task_list_mapping ON task_list_mapping.task_id = task.id INNER JOIN list ON task_list_mapping.list_id = list.id WHERE task.is_deleted = 0 AND DATE(scheduled_at) = CURDATE() ORDER BY task.updated_at DESC;";

  var a = connection.query(sql, [], (err, result) => {
    if (err) {
      throw err;
    }
    return res.json({
      code: "200",
      message: "",
      resultObj: result,
    });
  });
};

module.exports = {
  insertTask,
  getAllTasks,
  updateTaskStatus,
  updateTask,
  deleteTask,
  getNotifications,
};
