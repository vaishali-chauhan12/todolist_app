const connection = require("./connection");

const insertList = async (req, res) => {
  const { title, note, userId } = req.body;

  const sql = "INSERT INTO list (title, note, user_id) VALUES (?, ?, ?)";
  const values = [title, note, userId];

  connection.query(sql, values, (err, result) => {
    if (err) {
      throw err;
    }
    if (result.affectedRows) {
      const sql =
        "SELECT id, title, note FROM list WHERE is_deleted = 0 AND id = ?;";
      connection.query(sql, [result.insertId], (err, resultObj) => {
        if (err) {
          throw err;
        }
        return res.json({
          code: "200",
          message: "List Created Successfully",
          resultObj: { ...resultObj[0] },
        });
      });
    }
  });
};

const getAllListByUserId = (req, res) => {
  const { userId } = req.body;
  const sql =
    "SELECT id, title, note FROM list WHERE is_deleted = 0 AND user_id = ? ORDER BY updated_at DESC;";

  connection.query(sql, [userId], (err, result) => {
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

const updateList = async (req, res) => {
  const { id, title, note } = req.body;

  const sql = "UPDATE list SET title = ?, note = ? WHERE id = ?;";

  const values = [title, note, id];
  connection.query(sql, values, (err, result) => {
    if (err) {
      throw err;
    }
    if (result.affectedRows) {
      return res.json({
        code: "200",
        message: "List Updated Successfully",
        resultObj: {},
      });
    }
  });
};

const deleteList = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM list WHERE id = ?";

  connection.query(sql, [id], (err, result) => {
    if (err) {
      throw err;
    }
    if (result.affectedRows) {
      const sql = "DELETE FROM task_list_mapping WHERE list_id = ?";
      connection.query(sql, [id], (err, resultObj) => {
        if (err) {
          throw err;
        }
        return res.json({
          code: "200",
          message: "",
          resultObj: "List deleted successfully",
        });
      });
    }
  });
};

module.exports = {
  insertList,
  getAllListByUserId,
  updateList,
  deleteList,
};
