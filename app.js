// se_project_express/app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
require("dotenv").config();

const routes = require("./routes");
const { requestLogger, errorLogger } = require("./middlewares/logger"); // added import

// (blank line to satisfy import/newline-after-import)

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("Connected to DB");
  })
  .catch((e) => {
    console.error(e);
  });

/**
 * Explicit CORS for React dev server (http://localhost:3000)
 * Allows auth header for Bearer tokens and standard methods.
 */
const allowedOrigins = [
  "http://localhost:3000",
  "https://localhost:3000",
  "https://wtwr-myo.root.sx",
];

app.use(
  cors({
    origin(origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "authorization"],
    credentials: true,
  }),
);

// NOTE: Do NOT add app.options("*", cors()); — it crashes with your stack.

app.use(express.json());

// request logger FIRST (added line)
app.use(requestLogger);

app.use("/", routes);

// error logger AFTER routes, BEFORE error handlers (added line)
app.use(errorLogger);

app.use(errors()); // celebrate validation errors

// central error handler
const errorHandler = require("./middlewares/error-handler");

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${PORT}`);
});
