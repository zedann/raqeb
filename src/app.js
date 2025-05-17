const express = require("express");
const { handleGlobalError } = require("./middlewares/handleGlobalError");
const app = express();
const rideRouter = require("./routes/ride.routes");

app.use(express.json());

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "server running greatly :)",
  });
});

app.use("/api/rides", rideRouter);

app.use(handleGlobalError);
module.exports = app;
