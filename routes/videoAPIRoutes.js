const express = require('express');
const videoAPIControllers = require('../controllers/videoAPIControllers');

const router = express.Router();

router.route('/').post(videoAPIControllers.createVideo);

router.route('/:slug').get(videoAPIControllers.getVideo);

module.exports = router;
