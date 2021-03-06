import { closeSidebar, openEverything } from './closeFunctionality/index.js';
import unformattedDateToUSDate from './utils/unformattedDateToUSDate.js';

console.log(moment);
(function app() {
  const PAGE_URL = 'https://geniecast-video-page-builder.herokuapp.com';
  const slug = document.querySelector('.video-app').dataset.slug;

  let content = [];
  let speakerText = ``;

  function speakerHtmlCreator(obj) {
    speakerText += `<div class="speaker-card">
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

  function agendaCreator(obj) {
    let agendaHTML = ``;

    obj.forEach((dateHolder) => {
      agendaHTML += `<div class="agenda">
      <div class="date">
        ${moment(dateHolder.date).format('MMMM Do YYYY')}
      </div>`;

      dateHolder.eventInformation.forEach((event) => {
        console.log(event);
        agendaHTML += `<div class="agenda-box">
        <div class="time-slot">
          <i class="far fa-clock"></i> ${moment(
            event.startTime,
            'hh:mm'
          ).format('h:mm A')} - ${moment(event.endTime, 'hh:mm').format(
          'h:mm A'
        )}
        </div>
        <div class="agenda-information">
          <div class="title">
            ${event.eventTitle}
          </div>
          <div class="subheading">
            ${event.eventSubtitle}
          </div>
          <div class="moderators">
            <p class="moderators_title">MODERATORS</p>
            <p class="moderators_description">${event.moderators}</p>
          </div>
          <div class="speakers">
            <p class="speakers_title">SPEAKERS</p>
            <p class="speakers_description">${event.speakers}</p>
          </div>
        </div>`;
      });

      agendaHTML += `</div>`;
    });

    return agendaHTML;
  }

  function networkCreator(obj) {
    let networkHTML = ``;

    obj.forEach((networkDay) => {
      networkHTML += `<div class="agenda">
      <div class="date">
        ${moment(networkDay.date).format('MMMM Do YYYY')}
      </div>`;

      networkDay.breakoutInformation.forEach((event) => {
        console.log(event);
        networkHTML += `<div class="network-box">
        <div class="date" style="text-align: center">${
          event.breakoutTitle
        }</div>
      
        <div class="time-slot" style="margin: 20px 0; text-align: center">
            <i class="far fa-clock"></i> ${moment(
              event.startTime,
              'hh:mm'
            ).format('h:mm A')} - ${moment(event.endTime, 'hh:mm').format(
          'h:mm A'
        )}
          </div>
          <div style="width: 100%; margin-bottom: 50px;">
            <a href="${
              event.breakoutLink
            }" class="breakout-button" style="text-align: center; display: block; margin: 0 auto">Attend Room</a>
         </div>
         <hr class="style-two">
         `;
      });

      networkHTML += `</div></div>`;
    });

    return networkHTML;
  }

  async function grabSideBarContent() {
    try {
      let foundData = await fetch(PAGE_URL + '/v1/api/videos/' + slug);

      let data = await foundData.json();

      return data.body;
    } catch (err) {
      console.log(err);
    }
  }

  async function init() {
    let data = await grabSideBarContent();

    if (data.meetingPulseEmbed) {
      content.push(data.meetingPulseEmbed);
    }

    if (data.speakers) {
      data.speakers.speakerData.forEach((speaker) => {
        console.log(speaker);
        speakerHtmlCreator(speaker);
      });
      console.log('Speaker Text', speakerText);
      data.speakers.content = speakerText;
      content.push(data.speakers);
    }

    if (data.agenda) {
      const agenda = agendaCreator(data.agenda.agendaData);

      console.log('Agenda', agenda);
      data.agenda.content = agenda;
      content.push(data.agenda);
    }

    if (data.network) {
      const network = networkCreator(data.network.breakoutData);

      data.network.content = network;
      content.push(data.network);
    }

    console.log(content);

    const sidebar = new Sidebar();
    sidebar.setContent(content);
    // sidebar.setContent([
    //   {
    //     name: 'CHAT',
    //     active: true,
    //     content: `<iframe src="https://app.meet.ps/attendee/templatetest" width="400" height="600" style="border:none;"></iframe>`,
    //   },
    //   {
    //     name: 'AGENDA',
    //     active: false,
    //     content: `<div class="agenda">
    //       <div class="date">
    //         Thursday, July 30, 2020
    //       </div>
    //       <div class="agenda-box">
    //         <div class="time-slot">
    //           <i class="far fa-clock"></i> 10:05am - 10:50am
    //         </div>
    //         <div class="agenda-information">
    //           <div class="title">
    //             The Science of COVID
    //           </div>
    //           <div class="subheading">
    //             Epidemiology, Transmission and Testing
    //           </div>
    //           <div class="moderators">
    //             <p class="moderators_title">MODERATORS</p>
    //             <p class="moderators_description">Arnold Donald, Gloria Guevara</p>
    //           </div>
    //           <div class="speakers">
    //             <p class="speakers_title">SPEAKERS</p>
    //             <p class="speakers_description">Dr. Steven Gordon, Dr. William Morice, Dr. Schultz-Cherry, Dr. Joshua Wolf</p>
    //           </div>
    //         </div>
    //       </div>

    //       <div class="agenda-box">
    //         <div class="time-slot">
    //           <i class="far fa-clock"></i> 11:00am - 11:50am
    //         </div>
    //         <div class="agenda-information">
    //           <div class="title">
    //             Treatment & Prevention of COVID
    //           </div>
    //           <div class="subheading">
    //             Prevention, Treatment and Cures
    //           </div>
    //           <div class="moderators">
    //             <p class="moderators_title">MODERATORS</p>
    //             <p class="moderators_description">Arnold Donald, Gloria Guevara</p>
    //           </div>
    //           <div class="speakers">
    //             <p class="speakers_title">SPEAKERS</p>
    //             <p class="speakers_description">Dr. Julio Frenk, Dr. Adolfo Garcia-Sastre, Dr. Jewel Mullen, Dr. Vivek Murthy</p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>`,
    //   },
    //   {
    //     name: 'SPEAKERS',
    //     active: false,
    //     content: `<div class="speaker-card">
    //     <div class="speaker-info">
    //       <img src="https://images.marinelink.com/images/maritime/arnold-donald-photo-carnival-112132.jpeg" alt="Donald Arnold">
    //       <div class="name">Arnold Donald</div>
    //       <div class="title">
    //         President & Chief Executive Officer
    //       </div>
    //       <div class="organization">
    //         Carnival Corporation & PLC
    //       </div>
    //     </div>
    //     <div class="speaker-description">
    //       Arnold Donald is President  Chief Executive Officer of Carnival Corporation & PLC, the world's largest travel and leisure company.

    //       Their nine cruise brands -- Carnival Cruise Line, Holland America, Princess, Seabourn, AIDA, Costa Cunard, P&O UK, and P&O Australia are based throughout North America, Europe, Australia and Asia.

    //     </div>
    //   </div>

    //   <div class="speaker-card">
    //   <div class="speaker-info">
    //     <img src="https://www.phocuswrightconference.com/remote.jpg.ashx?width=350&height=350&scale=both&mode=crop&urlb64=aHR0cDovL3Bob2N1c3dyaWdodC5ibG9iLmNvcmUud2luZG93cy5uZXQvcGN3L1VTLVNwZWFrZXJQaG90b3MvcGMxNy1ndWV2YXJhLWcuanBn&hmac=5tjbTBTuWDk&src=http://phocuswright.blob.core.windows.net/pcw/US-SpeakerPhotos/pc17-guevara-g.jpg" alt="Donald Arnold">
    //     <div class="name">Gloria Guevara</div>
    //     <div class="title">
    //       President & CEO
    //     </div>
    //     <div class="organization">
    //       World Travel & Tourism Council
    //     </div>
    //   </div>
    //   <div class="speaker-description">
    //     Gloria joined WTTC in August 2017,
    //     following a varied career in Travel & Tourism. Recognised as one of the most influential women in Mexico by CNN and Expansion, Gloria began her professional career in 1989 at NCR Corporation working in the Latin America, Middle East, and Africa regions. Since 1995 she has worked for the travel industry, starting at the Sabre Travel Network and Sabre Holdings, she was later CEO of JV Sabre Mexico reporting to a board of directors from AeroMexico

    //   </div>
    // </div>`,
    //   },
    // ]);
    const sidebarElement = sidebar.getSidebar();

    document.body.querySelector('.video-app').append(sidebarElement);

    sidebar.onClose(closeSidebar);

    function setUpListeners() {
      document.body.addEventListener('click', (event) => {
        const clickedButton = event.target;

        if (clickedButton.closest('.open-container')) {
          sidebar.openSidebar();
          openEverything();
        }
      });
    }
    setUpListeners();

    gsap.from('.logo-container', {
      duration: 2,
      opacity: 0,
      delay: 3,
    });
    gsap.from('.multi-background', {
      duration: 2,
      x: -200,
      opacity: 0,
      delay: 0.7,
    });
    gsap.from('.video', {
      duration: 1,
      x: 200,
      opacity: 0,
      delay: 0.7,
    });
    gsap.from('.sidebar', {
      duration: 2,
      backgroundPosition: '200px 0px',
      y: 200,
      opacity: 0,
      delay: 1.7,
    });
  }
  init();
})();

//validate color
// const isColor = (strColor) => {
//   const s = new Option().style;
//   s.color = strColor;
//   return s.color !== '';
// }
