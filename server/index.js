const express = require("express");
const app = express();
var cors = require("cors");

app.use(express.json());
app.use(cors());

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

app.listen(5000, () => console.log("Listening on port 5000"));
