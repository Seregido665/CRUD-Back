const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Almenos 8 caracteres!"],
  },
});

module.exports = mongoose.model("User", userSchema);
