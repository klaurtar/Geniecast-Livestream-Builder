const express = require('express');
const videoControllers = require('../controllers/videoControllers');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');

const router = express.Router();
router.route('/login').get(videoControllers.getLoginForm);
router.post('/admin/login', authController.login);
//API Route

//router.use(authController.isLoggedIn);

router.route('/').get(authController.isLoggedIn, videoControllers.getAllVideos);

router
  .route('/new-page')
  .get(videoControllers.getNewPage)
  .post(videoControllers.createNewVideo);

router
  .route('/admin-list')
  .get(authController.isLoggedIn, adminController.adminView);

module.exports = router;