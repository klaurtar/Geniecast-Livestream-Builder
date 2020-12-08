import {
  checkBoxFunction,
  agendaFunction,
  openAgenda,
} from './checkBoxFunction.js';
import {
  speakerInformation,
  speakerInfo,
  speakerHtmlCreator,
  speakerHTML,
} from './speakerInfo.js';
import EventHolder from './EventHolder.js';

(function () {
  // const PAGE_URL = 'http://localhost:8080';
  const $submitButton = document.querySelector('.submit-button');
  const $speakerButton = document.querySelector('.speaker-button');

  const $meetingPulseCheck = document.querySelector('#meetingPulseCheck');
  const $speakerCheck = document.querySelector('#speakerCheck');
  const $agendaCheck = document.querySelector('#agendaCheck');

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

    console.log(dataStructure);

    sendData(dataStructure);
  }

  async function sendData(dataPayload) {
    try {
      await fetch(process.env.PAGE_URL + '/v1/api/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataPayload),
      });
      console.log('Data was successfully sent');
      window.location.href = process.env.PAGE_URL + '/videos/admin';
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
  }

  function init() {
    setUpListeners();
    $setAgenda.append(EventMaster.getEventHolder());
  }
  init();
})();
