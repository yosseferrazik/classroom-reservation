const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./../models/user");

router.post("/change", async (req, res) => {
  const { id, password, newpassword } = req.body;
  if (!password) return;
  if (!newpassword) return;
  try {
    const user = await User.findOne({ _id: id });
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        const hashedNewPassword = await bcrypt.hash(newpassword, 10);
        user.password = hashedNewPassword;
        user.save();
        res.send({ message: "Contrasenya cambiada correctament" });
      } else {
        res.send({ message: "Contrasenya incorrecta" });
      }
    } else {
      res.send({ message: "Aquest usuari no existeix (Error molt estrany)" });
    }
  } catch (err) {
    console.log(err);
  }
});
router.get("/verify", async (req, res) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).send({ message: "Accés no autoritzat" });
  }

  try {
    const decoded = jwt.verify(token, "secret-key");
    const user = await User.findOne({ name: decoded.name });
    res.send({
      message: "Token vàlid",
      user: user,
    });
  } catch (error) {
    res.status(401).send({ message: "Token no vàlid" });
  }
});

module.exports = router;
