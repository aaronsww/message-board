const express = require("express");
const app = express();
var cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");
// const users = require('./routes/users')
const auth = require("./middleware/auth");

require("dotenv").config();

app.use(express.json());

//added parameter
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// app.use('/api/users', users)

const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to Mongodb...", err));

const messageSchema = new mongoose.Schema({
  name: String,
  content: String,
  date: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

app.get("/api/messages", async (req, res) => {
  const messages = await Message.find();
  return res.json(messages);
});

app.post("/api/messages/add", auth, async (req, res) => {
  console.log(req);

  const user = await User.findById(req.user._id).select("-password");

  const message = new Message({
    name: user.name,
    content: req.body.content,
  });
  const result = await message.save();

  return res.json(result);
});

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 50 },
    email: {
      type: String,
      unique: true,
      required: true,
      minlength: 5,
      maxlength: 250,
    },
    password: { type: String, required: true, minlength: 5, maxlength: 1025 },
  })
);

app.get("api/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  send.res(user);
});

app.post("/api/register", async (req, res) => {
  console.log(req.body);

  const { error } = validateUser(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.header("x-auth-token", token).send(user);
});

app.post("/api/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  const result = await bcrypt.compare(req.body.password, user.password);
  if (result) {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    //set token as cookie
    res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 });

    res.header("x-auth-token", token).send(user);
  } else {
    res.status(401).send("Access denied. Invalid credentials.");
  }
});

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}

app.listen(5000, () => console.log("Listening on port 5000"));
