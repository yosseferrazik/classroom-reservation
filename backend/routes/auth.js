const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("./../models/user");

router.post("/login", async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name: name });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign({ name, password }, "secret-key", {
          expiresIn: "1h",
        });
        res.status(200).send({
          message: `Benvingut/da ${user.name}`,
          user: user,
          token: token,
        });
      } else {
        res.send({ message: "Contrasenya incorrecta" });
      }
    } else {
      res.send({ message: "Usuari no registrat" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error intern del servidor" });
  }
});
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ name: name });

    if (existingUser) {
      res.send({ message: "Usuari ja registrat" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      res.send({ message: "Has estat registrat correctament" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error intern del servidor" });
  }
});

module.exports = router;
