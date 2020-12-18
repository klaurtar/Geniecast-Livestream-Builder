const User = require('../models/userModel');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.adminView = catchAsync(async (req, res) => {
  const allAdmins = await User.find().populate('addedBy');
  // console.log(allAdmins);
  res.render('adminView', { admins: allAdmins });
});

exports.findAdmin = catchAsync(async (req, res) => {
  const foundAdmin = await User.findById(req.params.id);

  if (!foundAdmin) new AppError('This admin was not found with that ID!', 404);

  res.status(200).json({
    status: 'success',
    data: {
      admin: foundAdmin,
    },
  });
});

exports.updateAdmin = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.deleteAdmin = catchAsync(async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
