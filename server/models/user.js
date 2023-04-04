const express = require("express");
const mongoose = require('mongoose');

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
  
  // function validateUser(user){
  //   const schema = {
  //     name: Joi.string().min(5).max(50).required(),
  //     email: Joi.string().min(5).max(255).required().email(),
  //     password: Joi.string().min(5).max(255).required()
  //   }
  //   return Joi.validate(user,schema);
  // }

