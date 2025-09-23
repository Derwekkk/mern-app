// backend/server.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// middlewares
app.use(cors());
app.use(bodyParser.json());

// connect to MongoDB
connectDB(process.env.MONGO_URI);

// routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/agents", require("./routes/agents"));
app.use("/api/upload", require("./routes/upload"));

app.get("/", (req, res) => res.send("Backend running!"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
