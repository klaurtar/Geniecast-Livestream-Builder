const slugify = require('slugify');
const Template = require('../models/templates');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getVideo = catchAsync(async (req, res, next) => {
  const foundTemplate = await Template.findOne({ slug: req.params.slug });

  if (!foundTemplate) {
    return next(new AppError('Video was not found with that slug', 404));
  }

  res.status(200).json({
    status: 'success',
    body: foundTemplate,
  });
});

exports.createVideo = catchAsync(async (req, res) => {
  req.body.slug = slugify(req.body.pageName.toLowerCase());
  const newTemplate = await Template.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      tour: newTemplate,
    },
  });
});

exports.updateVideo = catchAsync(async (req, res, next) => {
  const foundVideo = await Template.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!foundVideo) {
    return next(new AppError('No Video found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      foundVideo,
    },
  });
});
