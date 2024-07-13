const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user");
const listRoutes = require("./routes/list");
const taskRoutes = require("./routes/task");
const resetPasswordRoutes = require("./routes/reset-password");

var app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

/* all route modules */
app.use("/user", userRoutes);
app.use("/list", listRoutes);
app.use("/task", taskRoutes);
app.use("/", resetPasswordRoutes);


/* Error handler middleware */
app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	console.error(err.message, err.stack);
	res.status(statusCode).json({ message: err.message });
	return;
  });

app.listen(8001, () => {
  console.log("Server running on 8001");
});
