const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require("cors");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

//port
const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const jobTypeRoute = require("./routes/jobsTypeRoutes");
const jobRoute = require("./routes/jobsRoutes");

const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: true,
  })
);
app.use(cookieParser());
app.use(cors());

//ROUTES MIDDLEWARE
// app.get('/', (req, res) => {
//     res.send("Hello from Node Js");
// })
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", jobTypeRoute);
app.use("/", jobRoute);

// error middleware
app.use(errorHandler);
