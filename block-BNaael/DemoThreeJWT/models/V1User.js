var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;

var usersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /@/ },
    password: { type: String, required: true, minlength: 5 },
  },
  { timestamps: true }
);
usersSchema.pre('save', async function (next) {
  if (this.password && this.isModified('password')) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      return error;
    }
  }
  next();
});

usersSchema.methods.verifyPassword = async function (password) {
  try {
    var result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    return error;
  }
};

usersSchema.methods.signToken = async function () {
  var payload = { userId: this.id, email: this.email };
  try {
    var token = await jwt.sign(payload, process.env.SECRET);
    return token;
  } catch (error) {
    return error;
  }
};

usersSchema.methods.userJSON = function (token) {
  return {
    name: this.name,
    email: this.email,
    token: token,
  };
};

module.exports = mongoose.model('V1User', usersSchema);
