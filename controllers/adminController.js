const User = require('../models/userModel');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.adminView = catchAsync(async (req, res) => {
  const allAdmins = await User.find().populate('addedBy');
  console.log(allAdmins);
  res.render('adminView', { admins: allAdmins });
});
