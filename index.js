const express = require("express");
const cors = require("cors");
const winston = require("winston");
const dotenv = require("dotenv");
const linkedinPdfRouter = require("./routes/linkedinPdfRouter.js");

// API Log
const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "tonnie-linkedinPdf-api.log" }),
  ],
  format: combine(
    label({ label: "tonnie-linkedinPdf-api" }),
    timestamp(),
    myFormat
  ),
});

// Envi file - variable configuration
dotenv.config();

//
// API start
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/linkedinPdf", linkedinPdfRouter);
app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
