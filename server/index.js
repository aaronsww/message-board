const express = require("express");
const app = express();
var cors = require("cors");
const jwt = require("jsonwebtoken");
// const _ = require("loadash");
// const users = require('./routes/users')

require("dotenv").config();
console.log(process.env);

app.use(express.json());
app.use(cors());

// app.use('/api/users', users)

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://0.0.0.0:27017/messageBoard")
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

app.post("/api/messages/add", async (req, res) => {
  console.log(req.body);

  const message = new Message({
    name: req.body.name,
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

app.post("/api/users", async (req, res) => {
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

  await user.save();

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.send(token);
});

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(user, schema);
}

app.listen(5000, () => console.log("Listening on port 5000"));
