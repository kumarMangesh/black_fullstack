const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

const port = process.env.PORT || 8000;
const app = express();

connectDB();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: "20mb" }));

app.use("/api/dashboard", require("./routes/routes"));

// Serve frontend

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "client/dist", "index.html"))
);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
