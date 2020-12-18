const User = require('../models/userModel');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.adminView = catchAsync(async (req, res) => {
  const allAdmins = await User.find().populate('addedBy');
  // console.log(allAdmins);
  res.render('adminView', { admins: allAdmins });
});

exports.deleteAdmin = catchAsync(async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
