const laptopRoutes = require("./routes/laptops");

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());
app.use(express.static("public"));


app.use("/laptops", laptopRoutes);

/* Test route */
app.get("/", (req, res) => {
  res.send("Laptop API is running");
});

/* MongoDB connection */
mongoose
  .connect("mongodb://127.0.0.1:27017/laptopDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

/* Start server */
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
