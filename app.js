"use strict";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveawayEl = document.querySelector(".giveaway");
const deadlineEl = document.querySelector(".deadline");
const counterItemsEl = document.querySelectorAll(".deadline-format h4");
// console.log(items);

// future date
// let futureDate = new Date(2026, 4, 24, 10, 2, 0);
const tempDate = new Date();
const tempYear = tempDate.getFullYear();
const tempMonth = tempDate.getMonth();
const tempDay = tempDate.getDate();
// always 10 days in the future (added in the end)
let futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0);

const year = futureDate.getFullYear();
const month = months[futureDate.getMonth()]; // from array
const weekday = weekdays[futureDate.getDay()];
const day = futureDate.getDate();
const hours = futureDate.getHours();
const minutes = String(futureDate.getMinutes()).padStart(2, "0");

giveawayEl.textContent = `giveaway ends on ${weekday}, ${day} ${month} ${year} ${hours}:${minutes}am`;

// setting time counter

const futureTime = futureDate.getTime();

const getRemainingTime = function () {
  const currentTime = new Date().getTime();
  const t = futureTime - currentTime;
  // values in miliseconds
  const oneSec = 1000;
  const oneMin = 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneDay = 24 * 60 * 60 * 1000;

  let days = t / oneDay;
  let hours = t / oneHour;
  let minutes = t / oneMin;
  let seconds = t / oneSec;

  days = Math.floor(days);
  hours = Math.floor((t % oneDay) / oneHour);
  minutes = Math.floor((t % oneHour) / oneMin);
  seconds = Math.floor((t % oneMin) / oneSec);

  const values = [days, hours, minutes, seconds];

  function format(item) {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  }

  counterItemsEl.forEach((item, index) => {
    item.innerHTML = format(values[index]);
  });

  if (t < 0) {
    clearInterval(countdown);
    deadlineEl.innerHTML = `
    <h4 class="expired">sorry, this give away has expired</h4>
    `;
  }
};

let countdown = setInterval(getRemainingTime, 1000);

getRemainingTime();
// Invoke this after `countdown` otherwise we don't have
// access to `countdown` inside the `getRemainingTime`.
