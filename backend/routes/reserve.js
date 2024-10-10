const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Reserve = require("./../models/reserva");
const User = require("./../models/user");

router.post("/new", async (req, res) => {
  const {
    reserveOwnerId,
    reserveClass,
    reserveHours,
    reserveDay,
    reserveName,
    reserveMonth,
    reservePublicName,
    reserveFullDate,
  } = req.body;
  try {
    const existingReserve = await Reserve.findOne({
      reserveDay: reserveDay,
      reserveClass: reserveClass,
      reserveHours: { $in: reserveHours },
    });
    if (existingReserve) {
      return res.send({
        message: "Ja hi ha una reserva activa amb aquestes dades",
        reserve: existingReserve,
        error: true,
      });
    } else {
      const newReserve = new Reserve({
        reserveDay,
        reserveHours,
        reserveClass,
        reserveOwnerId,
        reserveName,
        reserveMonth,
        reservePublicName,
        reserveFullDate,
      });

      await newReserve.save();

      const filter = { id: reserveOwnerId };
      const update = { $push: { bookings: newReserve.id } };

      await User.findOneAndUpdate(filter, update, { new: true });

      return res.send({ message: "Reserva creada" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error intern del servidor" });
  }
});

router.get("/reserves", async (req, res) => {
  try {
    let allReserves = await Reserve.find();

    const expiredReserves = allReserves.filter(
      (reserve) => reserve.reserveFullDate < new Date().setHours(0, 0)
    );

    expiredReserves.forEach(async (reserve) => {
      await Reserve.findByIdAndDelete(reserve._id);
    });

    res.send(allReserves);
  } catch (error) {
    console.error("Error en obtenir les reserves:", error);
    res.status(500).send("Error en obtenir les reserves");
  }
});
module.exports = router;
