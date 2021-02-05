import SpeakerContainer from './SpeakerContainer.js';
import {
  createNewSpeaker,
  toggleCloseAllSpeakers,
  numberOfSpeakers,
} from './speakerContainerManager.js';
import idCreator from '../utils/idCreator.js';

export let speakerInformation = [];
export let speakerHTML = '';

let insertedIdInput = false;

export function speakerInfo(e) {
  const $idField = document.querySelector('#speakerId');

  const $speakerImage = document.querySelector('#speakerImage');
  const $speakerName = document.querySelector('#speakerName');
  const $speakerTitle = document.querySelector('#speakerTitle');
  const $speakerOrganization = document.querySelector('#speakerOrganization');
  const $speakerDescription = document.querySelector('#speakerDescription');
  const $nameHolder = document.querySelector('#name-holder');

  if (!$idField) {
    e.preventDefault();

    if (numberOfSpeakers() !== 0) {
      toggleCloseAllSpeakers(false);
    }

    let speakerDetails = {
      id: idCreator(10),
      speakerImage: $speakerImage.value,
      speakerName: $speakerName.value,
      speakerTitle: $speakerTitle.value,
      speakerOrganization: $speakerOrganization.value,
      speakerDescription: $speakerDescription.value,
    };

    setUpNewSpeakerInstance(speakerDetails);

    resetForm();
  } else {
    e.preventDefault();
    const foundSpeaker = speakerInformation.find(
      (speaker) => speaker.id === $idField.value
    );

    foundSpeaker.speakerImage = $speakerImage.value;
    foundSpeaker.speakerName = $speakerName.value;
    foundSpeaker.speakerTitle = $speakerTitle.value;
    foundSpeaker.speakerOrganization = $speakerOrganization.value;
    foundSpeaker.speakerDescription = $speakerDescription.value;
    resetForm();
    insertIdInput();
    toggleCloseAllSpeakers(false);
  }
}

function resetForm() {
  const $speakerImage = document.querySelector('#speakerImage');
  const $speakerName = document.querySelector('#speakerName');
  const $speakerTitle = document.querySelector('#speakerTitle');
  const $speakerOrganization = document.querySelector('#speakerOrganization');
  const $speakerDescription = document.querySelector('#speakerDescription');

  [
    $speakerImage,
    $speakerName,
    $speakerTitle,
    $speakerOrganization,
    $speakerDescription,
  ].forEach((el) => {
    el.value = '';
  });
}

export function speakerHtmlCreator(obj, string) {
  string += `<div class="speaker-card">
     <div class="speaker-info">
       <img src="${obj.speakerImage}" alt="${obj.speakerName}">
       <div class="name">${obj.speakerName}</div>
       <div class="title">
         ${obj.speakerTitle}
       </div>
       <div class="organization">
       ${obj.speakerOrganization}
       </div>
     </div>
     <div class="speaker-description">
      ${obj.speakerDescription}
     </div>
   </div>`;
}

function insertIdInput() {
  const $idField = document.querySelector('#id__field-container');
  if (!insertedIdInput) {
    const html = `<div class="form-group">
  <label for="speakerId">Speaker ID</label>
  <input type="text" class="form-control mb-3" name="speakerId" id="speakerId" readonly>
</div>`;

    $idField.insertAdjacentHTML('afterbegin', html);

    insertedIdInput = true;
  } else {
    $idField.innerHTML = '';
    insertedIdInput = false;
  }
}

export function fillInInfo(speaker) {
  const $speakerImage = document.querySelector('#speakerImage');
  const $speakerName = document.querySelector('#speakerName');
  const $speakerTitle = document.querySelector('#speakerTitle');
  const $speakerOrganization = document.querySelector('#speakerOrganization');
  const $speakerDescription = document.querySelector('#speakerDescription');
  const $speakerId = document.querySelector('#speakerId');

  $speakerImage.value = speaker.speakerImage;
  $speakerName.value = speaker.speakerName;
  $speakerTitle.value = speaker.speakerTitle;
  $speakerOrganization.value = speaker.speakerOrganization;
  $speakerDescription.value = speaker.speakerDescription;
  $speakerId.value = speaker.id;
}

//Send over to me the presets that we have

export function setUpNewSpeakerInstance(speakerInfo) {
  const speakerInfoInNameHolder = createNewSpeaker(speakerInfo);
  speakerInfoInNameHolder.onClick(() => {
    const id = speakerInfoInNameHolder.nameClick();
    const foundSpeaker = speakerInformation.find(
      (speaker) => speaker.id === id
    );
    insertIdInput();

    fillInInfo(foundSpeaker);
    toggleCloseAllSpeakers(true);
  });
  speakerInfoInNameHolder.onClose(() => {
    console.log('On Close');
  });
  // $nameHolder.append(speakerInfoInNameHolder.getSpeakerContainer());

  speakerInformation.push(speakerInfo);
}
