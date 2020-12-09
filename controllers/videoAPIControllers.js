const slugify = require('slugify');
const Template = require('../models/templates');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getVideo = catchAsync(async (req, res, next) => {
  const foundTemplate = await Template.find({ slug: req.params.slug });

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
