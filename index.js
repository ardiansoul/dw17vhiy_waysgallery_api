if (!process.env.NODE_ENV === "production") {
  require("dotenv").config();
}

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
// const Seed = require("./seeders/index");

// const db = require("./models");
// db.sequelize
//   .sync({ force: true })
//   .then(() => {
//     console.log("sequelize db sync");
//     // return Seed();
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const router = require("./src/routes/routeV1");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/uploads", express.static("uploads"));

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("express running");
});

app.listen(port, () => {
  console.log(`server running in port ${port}`);
});
