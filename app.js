const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes"); // index.js is implied

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((e) => console.error(e));

app.use(express.json());

// temporary auth middleware (must be before routes)
app.use((req, res, next) => {
  req.user = { _id: "000000000000000000000001" };
  next();
});

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
