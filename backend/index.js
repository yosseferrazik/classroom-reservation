const dotenv = require("dotenv");
dotenv.config();

const generic = require("generic-logs");

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const Reserva = require("./models/reserva.js");

app.use(express.json());
app.use(cors());

const auth = require("./routes/auth.js");
const user = require("./routes/user.js");
const reserve = require("./routes/reserve.js");

app.use("/auth", auth);
app.use("/user", user);
app.use("/reserve", reserve);

mongoose
  .connect(process.env.MONGO, {})
  .then(() =>
    generic.custom({
      title: "DB",
      message: "Base de dades connectada",
      color: "green",
    })
  )
  .catch((err) => generic.error(err));

app.get("/", async (req, res) => {
  res.redirect("https://google.com");
});
app.listen(process.env.PORT, () => {
  generic.info(`Servidor obert al port ${process.env.PORT}`);
});
