const timer = (deadline) => {
  const timerBlock = document.querySelector('.timer');
  const dayCounter = document.querySelector('.galery__counter--day');
  const hourCounter = document.querySelector('.galery__counter--hour');
  const minuteCounter = document.querySelector('.galery__counter--minute');
  const dayText = document.querySelector('.galery__text--day');
  const hourText = document.querySelector('.galery__text--hour');
  const minuteText = document.querySelector('.galery__text--minute');


  const getUtc = (date, offsetUtc) => {
    const time = date.getTime();
    const diffTime = date.getTimezoneOffset() * 6e4;
    const utcTime = time + diffTime;
    const newDate = new Date(utcTime + (36e5 * offsetUtc));
    return newDate.getTime();
  };

  const getTime = () => {
    const timeStop = getUtc(new Date(deadline), 3);
    timerBlock.dataset.deadline = new Date(timeStop).toLocaleString();
    const timeNow = new Date().getTime();
    const timeRemaining = timeStop - timeNow;
    const days = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);
    const hours = Math.floor(timeRemaining / 1000 / 60 / 60 % 24);
    const minutes = Math.floor(timeRemaining / 1000 / 60 % 60);
      return {
      timeRemaining,
      days,
      hours,
      minutes,
      };
  };

  const correctWords = {
    day: ['день', 'дня', 'дней'],
    hour: ['час', 'часа', 'часов'],
    minute: ['минута', 'минуты', 'минут'],
    second: ['секунда', 'секунды', 'секунд'],
    get(num, type) {
      let index;
      if (num === 1) {
        index = 0;
      } else if (num >= 2 && num <= 4) {
        index = 1;
      } else {
        index = 2;
      }
      return this[type][index];
    },
  };
  
  const renderWords = () => {
    const timer = getTime();
    dayText.textContent = correctWords.get(timer.days, 'day');
    hourText.textContent = correctWords.get(timer.hours, 'hour');
    minuteText.textContent = correctWords.get(timer.minutes, 'minute');
  };

  const renderTimer = () => {
    const timer = getTime();
    dayCounter.textContent = `${timer.days}`;
    hourCounter.textContent = `${timer.hours}`;
    minuteCounter.textContent = `${timer.minutes}`;

  };

  const stopTimer = () => {
    timerBlock.style.display = 'none';
  };

  const checkDays = () => {
    const timer = getTime();
    if (timer.timeRemaining <= 864e+5) {
      dayCounter.style.display = 'none';
      dayText.style.display = 'none';
    }
  };

  const init = () => {
    renderTimer();
    renderWords();
    const timer = getTime();
    const interval = setTimeout(init, 1000);
    checkDays();
    if (timer.timeRemaining <= 0) {
      clearTimeout(interval);
      dayCounter.textContent = '00';
      hourCounter.Counter.textContent = '00';
      minuteCounter.textContent = '00';

      dayText.textContent = 'дней';
      hourText.textContent = 'часов';
      minuteText.textContent = 'минут';

      setTimeout(stopTimer, 3000);
    }
  };
  init();
};

document.addEventListener('DOMContentLoaded', () => {
  const dataTimerDeadline = document.querySelectorAll('[data-timer-deadline]');
  if (dataTimerDeadline) {
    dataTimerDeadline.forEach(elem => {
      elem.insertAdjacentHTML('afterbegin', `
<p class="galery__subtitle">До конца акции:</p>
  <p class="galery__text-counter">
    <span class="galery__counter galery__counter--day"></span>
    <span class="galery__text galery__text--day"></span>
    <span class="galery__counter galery__counter--hour"></span>
    <span class="galery__text galery__text--hour"></span>
    <span class="galery__counter galery__counter--minute"></span>
    <span class="galery__text galery__text--minute"></span>
  </p>
      `);
    });
  }

  timer('2023/12/23 12:00');
});