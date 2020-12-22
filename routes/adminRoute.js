const express = require('express');
const videoControllers = require('../controllers/videoControllers');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');

const router = express.Router();
router.route('/login').get(videoControllers.getLoginForm);
router.post('/admin/login', authController.login);
//API Route

//router.use(authController.isLoggedIn);

router.use(authController.protect);
router.use(authController.restrictTo('admin', 'Super Admin'));

router.route('/').get(authController.isLoggedIn, videoControllers.getAllVideos);

router
  .route('/new-page')
  .get(authController.isLoggedIn, videoControllers.getNewPage)
  .post(videoControllers.createNewVideo);

router
  .route('/admin-list')
  .get(authController.isLoggedIn, adminController.adminView);

router
  .route('/:id')
  .get(adminController.findAdmin)
  .patch(adminController.updateAdmin)
  .delete(adminController.deleteAdmin);

module.exports = router;
