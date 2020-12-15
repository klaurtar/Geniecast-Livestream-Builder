const express = require('express');
const videoControllers = require('../controllers/videoControllers');
const authController = require('../controllers/authController');

const router = express.Router();

// router.post('/admin/login', authController.login);
//API Route

router
  .route('/:slug')
  .get(videoControllers.getVideo)
  .delete(videoControllers.deleteVideo);

// router
//   .route('/admin/new-page')
//   .get(videoControllers.getNewPage)
//   .post(videoControllers.createNewVideo);

// router.use(authController.isLoggedIn);

// router.route('/admin').get(videoControllers.getAllVideos);

module.exports = router;
