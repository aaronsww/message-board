const jwt = require("jsonwebtoken");

require("dotenv").config();

function auth(req, res, next) {

  //reading cookie 
  const token = req.header("x-auth-token") || req.headers.cookie.split("; ")[0].substring(4);
  console.log(req.headers.cookie);
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(401).send("Invalid token.");
  }
}

module.exports = auth;
