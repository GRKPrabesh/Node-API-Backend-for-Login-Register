const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // ✅ corrected
    unique: true,
  },
  email: {
    type: String,
    required: true, // ✅ corrected
    unique: true,
  },
  password: {
    type: String,
    required: true, // ✅ corrected
  },
  createdAt: { type: Date, default: Date.now },
});

// 🔹 Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // only hash if modified
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 🔹 Method to check password during login
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
