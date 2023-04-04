const express = require("express");
const app = express();
var cors = require("cors");
const jwt = require('jsonwebtoken');
// const _ = require("loadash");
// const users = require('./routes/users')

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

app.get("/", (req, res) => {
  res.send("Hello John");
});

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

  // const user = new User(_.pick(req.body, ["name", "email", "password"]));

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const token = jwt.sign({ _id: user._id}, 'jwtPrivateKey')
  res.send(token);

  const result = await user.save();

  return res.json(result);
});

app.listen(5000, () => console.log("Listening on port 5000"));
