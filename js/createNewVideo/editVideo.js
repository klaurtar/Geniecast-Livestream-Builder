import {
  checkBoxFunction,
  agendaFunction,
  openAgenda,
  openBreakout,
} from './checkBoxFunction.js';
import {
  speakerInformation,
  speakerInfo,
  speakerHtmlCreator,
  speakerHTML,
} from './speakerInfo.js';
import EventHolder from './EventHolder.js';
import BreakoutHolder from './breakOutLogic/BreakoutHolder.js';

(function () {
  const PAGE_URL = 'https://geniecast-video-page-builder.herokuapp.com';
  const PAGE_URL_LOCAL = 'http://localhost:8080';
  const $submitButton = document.querySelector('.submit-button');
  const $speakerButton = document.querySelector('.speaker-button');

  const $meetingPulseCheck = document.querySelector('#meetingPulseCheck');
  const $speakerCheck = document.querySelector('#speakerCheck');
  const $agendaCheck = document.querySelector('#agendaCheck');
  const $breakoutCheck = document.querySelector('#breakoutCheck');

  const $pageName = document.querySelector('#pageName');
  const $logo = document.querySelector('#logo');
  const $hostedPlatform = document.querySelector('#hostedPlatform');
  const $video = document.querySelector('#video');
  const $title = document.querySelector('#title');
  const $backgroundColor = document.querySelector('#background-color');
  const $logoContainerColor = document.querySelector(
    '#logo-container-background-color'
  );
  const $meetingPulseEmbed = document.querySelector('#meetingPulseEmbed');
  const $setAgenda = document.querySelector('.setAgenda');
  const $setBreakout = document.querySelector('.setBreakout');

  const EventMaster = new EventHolder();

  let formData = [
    $pageName,
    $logo,
    $hostedPlatform,
    $video,
    $title,
    $backgroundColor,
    $logoContainerColor,
  ];

  // let dataStructure = {
  //   pageName: undefined,
  //   logo: undefined,
  //   hostedPlatform: undefined,
  //   video: undefined,
  //   title: undefined,
  //   backgroundColor: undefined,
  //   logoContainerBackgroundColor: undefined,
  // };

  let dataStructure = {};

  function grabData(e) {
    e.preventDefault();
    speakerInformation.forEach((speaker) => {
      speakerHtmlCreator(speaker);
    });
    formData.forEach((input) => {
      dataStructure[input['name']] = input.value;
    });

    if ($meetingPulseCheck.checked) {
      dataStructure['meetingPulseEmbed'] = {
        name: 'Engage',
        active: true,
        content: $meetingPulseEmbed.value,
      };
    }
    if ($speakerCheck.checked) {
      dataStructure['speakers'] = {
        name: 'Speakers',
        active: false,
        speakerData: speakerInformation,
      };
    }
    if ($agendaCheck.checked) {
      dataStructure['agenda'] = {
        name: 'Agenda',
        active: false,
        agendaData: EventMaster.getAllData(),
      };
    }
    if ($breakoutCheck.checked) {
      dataStructure['network'] = {
        name: 'Network',
        active: false,
        breakoutData: BreakoutHolder.getAllData(),
      };
    }

    console.log(dataStructure);

    sendData(dataStructure);
  }

  async function sendData(dataPayload) {
    try {
      await fetch(PAGE_URL + '/videos/edit/' + videoID, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataPayload),
      });
      console.log('Data was successfully sent');
      console.log(PAGE_URL + '/videos/edit/' + videoID);
      window.location.assign('/admin');
    } catch (err) {
      console.log(err);
    }
  }

  function setUpListeners() {
    $submitButton.addEventListener('click', grabData);
    $meetingPulseCheck.addEventListener('change', checkBoxFunction);
    $speakerCheck.addEventListener('change', agendaFunction);
    $speakerButton.addEventListener('click', speakerInfo);
    $speakerButton.addEventListener('click', speakerInfo);
    $agendaCheck.addEventListener('click', openAgenda);
    $breakoutCheck.addEventListener('click', openBreakout);
  }

  function init() {
    setUpListeners();
    $setAgenda.append(EventMaster.getEventHolder());
    $setBreakout.append(BreakoutHolder.getbreakoutHolder());
  }
  init();
})();
