export function checkBoxFunction() {
  const $meetingPulseContainer = document.querySelector(
    '#meetingPulseContainer'
  );
  if (this.checked) {
    $meetingPulseContainer.style.display = 'block';
  } else {
    $meetingPulseContainer.style.display = 'none';
  }
}

export function agendaFunction() {
  const $speakerContainer = document.querySelector('#speakerContainer');
  if (this.checked) {
    $speakerContainer.style.display = 'block';
  } else {
    $speakerContainer.style.display = 'none';
  }
}

export function openAgenda() {
  const $agendaCheck = document.querySelector('.setAgenda');
  if (this.checked) {
    $agendaCheck.style.display = 'block';
  } else {
    $agendaCheck.style.display = 'none';
  }
}

export function openBreakout() {
  const $breakoutCheck = document.querySelector('.setBreakout');
  if (this.checked) {
    $breakoutCheck.style.display = 'block';
  } else {
    $breakoutCheck.style.display = 'none';
  }
}
