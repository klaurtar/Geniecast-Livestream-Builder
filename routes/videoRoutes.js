const express = require('express');
const videoControllers = require('../controllers/videoControllers');

const router = express.Router();

router.route('/admin').get(videoControllers.getAllVideos);

router
  .route('/:slug')
  .get(videoControllers.getVideo)
  .delete(videoControllers.deleteVideo);

router
  .route('/admin/new-page')
  .get(videoControllers.getNewPage)
  .post(videoControllers.createNewVideo);

module.exports = router;
