const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    role: {
        type: String,
        enum: ['student','academic', 'administrator']
    },
    password: {
        type: String,
        required: true
    },
    institution: {
      type: Schema.Types.ObjectId,
      ref: 'institute'
    }
});

// On save hook encrypt password
UserSchema.pre("save", function(next) {
    const user = this;
  
    // Generate a salt for the pasword
    bcrypt.genSalt(10, function(err, salt) {
      // If an error generating salt next with error
      if (err) {
        return next(err);
      }
  
      // Generate a hash for the pasword
      bcrypt.hash(user.password, salt, null, function(err, hash) {
        // If an error generating salt next with error
        if (err) {
          return next(err);
        }
  
        // If no errors overwrite the user password string with hash
        user.password = hash;
        next();
      });
    });
  });
  
  // Set up a method to compare submitted passwords with stored password
  // Behind the scenes it will hash and salt submittedPassword to check for match
  UserSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) {
        return callback(err);
      }
  
      callback(null, isMatch);
    });
  };
  
  const User = mongoose.model("user", UserSchema);
  
  module.exports = User;