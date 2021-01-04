const slugify = require('slugify');
const Template = require('../models/templates');
const readFilePro = require('../readDevData');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllVideos = catchAsync(async (req, res) => {
  const test = await Template.find({});
  //const jsonDoc = JSON.parse(test);

  res.render('videos', { videos: test }); //{ video: foundVideo }
});

exports.getVideo = catchAsync(async (req, res, next) => {
  const foundVideo = await Template.findOne({ slug: req.params.slug });

  if (!foundVideo)
    return next(new AppError('No video found with that ID', 404));

  res.render('showVideo', { video: foundVideo }); //{ video: foundVideo }
});

exports.editVideo = catchAsync(async (req, res, next) => {
  const foundVideo = await Template.findById(req.params.id);

  if (!foundVideo) return next(new AppError('No video found with that ID'));

  res.render('editVideo', { videoData: foundVideo });
});

exports.createNewVideo = catchAsync(async (req, res) => {
  console.log(req.body);
  req.body.slug = slugify(req.body.pageName.toLowerCase());
  //const body = req.body;
  console.log(req.body);

  await Template.create(req.body);

  res.status(201).redirect('/videos/admin');
});

exports.deleteVideo = catchAsync(async (req, res) => {
  const video = await Template.deleteOne({ slug: req.params.slug });

  if (!video) return next(new AppError('No video found with that ID', 404));

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getNewPage = catchAsync(async (req, res) => {
  res.render('createNewVideo');
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};
