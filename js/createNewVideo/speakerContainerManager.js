import SpeakerContainer from './SpeakerContainer.js';

const $nameHolder = document.querySelector('#name-holder');

const speakerHolder = [];

export function createNewSpeaker(speakerInfo) {
  const speaker = new SpeakerContainer(speakerInfo);
  const $speakerElement = speaker.getSpeakerContainer();
  $nameHolder.append($speakerElement);
  speakerHolder.push(speaker);
  return speaker;
}

export function toggleCloseAllSpeakers(boolean) {
  console.log('Speaker Holder', speakerHolder);
  speakerHolder.forEach((speaker) => speaker.togglePreventClose(boolean));
}

export function numberOfSpeakers() {
  return speakerHolder.length;
}
