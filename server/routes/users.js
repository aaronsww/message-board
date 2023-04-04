const { User } = require("../models/user");
var cors = require("cors");

app.use(cors());
app.use(express.json());

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.post("/", async (req, res) => {
  console.log(req.body);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const result = await user.save();

  return res.json(result);
});

module.exports = router;
