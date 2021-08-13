import { pluralize } from './utils';

function getTimeRemaining(endtime) {
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds
  };
}

function initializeClock(id, endtime) {
  const clockElement = document.querySelector(id);
  const daysElement = clockElement.querySelector('#timer-days');
  const hoursElement = clockElement.querySelector('#timer-hours');
  const minutesElement = clockElement.querySelector('#timer-minutes');

  function updateClock() {
    const { total, days, hours, minutes, seconds } = getTimeRemaining(endtime);

    daysDigits = days.toString().padStart(2, '0').split('');
    hoursDigits = hours.toString().padStart(2, '0').split('');
    minutesDigits = minutes.toString().padStart(2, '0').split('');

    daysElement
      .querySelectorAll('.timer__part-cell')
      .forEach((cell, index) => {
        cell.innerHTML = daysDigits[index];
      });

    daysElement
      .querySelector('timer__part-category-name')
      .innerHTML = pluralize(days, ['день', 'дня', 'дней']);

    hoursElement
      .querySelectorAll('.timer__part-cell')
      .forEach((cell, index) => {
        cell.innerHTML = hoursDigits[index];
      });

    hoursElement
      .querySelector('timer__part-category-name')
      .innerHTML = pluralize(hours, ['час', 'часа', 'часов']);

    minutesElement
      .querySelectorAll('.timer__part-cell')
      .forEach((cell, index) => {
        cell.innerHTML = minutesDigits[index];
      });

    minutesElement
      .querySelector('timer__part-category-name')
      .innerHTML = pluralize(minutes, ['минута', 'минуты', 'минут']);

    if (total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  const timeinterval = setInterval(updateClock, 1000);
}

const deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
initializeClock('.timer', deadline);
