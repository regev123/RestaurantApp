const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // you can insert all the roles you want in this array
    default: 'user',
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//Encrypt the password before saving to DB
UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(10));

  next();
});

module.exports = User = mongoose.model('user', UserSchema);
