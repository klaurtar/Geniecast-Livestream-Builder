const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const templateSchema = new mongoose.Schema({
  pageName: {
    type: String,
    required: [true, 'A template must have page name'],
  },
  logo: {
    type: String,
    required: [true, 'A template must have a logo'],
  },
  hostedPlatform: {
    type: String,
    required: [true, 'A template must have a hostedPlatform'],
  },
  video: {
    type: String,
    required: [true, 'A template must have a video URL'],
  },
  title: {
    type: String,
    required: [true, 'A template must have a title'],
  },
  backgroundColor: {
    type: String,
  },
  multipleBackground: {
    type: String,
  },
  logoContainerBackgroundColor: {
    type: String,
  },
  dateCreated: {
    type: String,
    default: dateFormat(new Date()),
  },
  meetingPulseEmbed: {
    type: Object,
  },
  speakers: {
    type: Object,
  },
  agenda: {
    type: Object,
  },
  network {
    type: Object
  },
  slug: {
    type: String,
  },
});

const Template = mongoose.model('Templates', templateSchema);

module.exports = Template;
