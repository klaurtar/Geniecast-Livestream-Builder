const { randomBytes, createHash } = require('crypto');
const moment = require('moment');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A user must have a name'],
      match: [
        new RegExp(/^[a-zA-Z\s]+$/),
        '{VALUE} is not valid. Please use only letters',
      ],
    },
    email: {
      type: String,
      required: [true, 'A user must have an email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    photo: String,
    role: {
      type: String,
      enum: ['user', 'admin', 'Super Admin'],
      default: 'admin',
    },
    password: {
      type: String,
      required: [true, 'Provide a password'],
      minLength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        // This only works on CREATE and SAVE!!
        validator: function (el) {
          return el === this.password; //abc === abc
        },
        message: 'Passwords are not the same',
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    addedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual('simpleTimeAdded').get(function () {
  return moment(this.dateCreated).format('MM/DD/YYYY');
});

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  //Hash the password with cost of 12 CPU
  this.password = await bcrypt.hash(this.password, 12);

  //Delete passwordConfrim field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

//QUERY MIDDLEWARE
userSchema.pre(/^find/, function (next) {
  // this points to the current query so any time User.Find() is run...this will run rist and only pull documents that
  //have active set to true
  this.find({ active: { $ne: false } });
  next();
});

// userSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'addedBy',
//     select: '-__v -passwordChangedAt',
//   });
//   next();
// });

//Instance method - method that is available for all documents of a certain collection
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimeStamp; // 100 < 200
  }

  //false means not changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = randomBytes(32).toString('hex');

  this.passwordResetToken = createHash('sha256')
    .update(resetToken)
    .digest('hex');
  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
