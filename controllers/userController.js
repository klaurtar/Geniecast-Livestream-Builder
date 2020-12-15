const User = require('../models/userModel');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createNewUser = catchAsync(async (req, res) => {
  console.log(req.body);

  // if (!req.body.addedBy) req.body.addedBy = req

  const newUser = await User.create(req.body);

  res.status(201).json({
    status: 'success',
    statusCode: res.statusCode,
    data: {
      user: newUser,
    },
  });
});

exports.deleteAdmin = catchAsync(async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
