const monthNames = [
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
  "December"
];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

function formatDate(d) {
  const day = days[d.getDay()];
  const date = d.getDate();
  const month = monthNames[d.getMonth() + 1];
  const hours = d.getHours();
  const minutes = d.getMinutes();

  return `${day}, ${date} ${month} ${hours}:${minutes}`;
}

function secondsAngle(d) {
  return d.getSeconds() / 60 * 360;
}

function minutesAngle(d) {
  return d.getMinutes() / 60 * 360;
}

function hoursAngle(d) {
  return d.getHours() / 12 * 360;
}

function updateClock() {
  const d = new Date();
  clock.textContent = formatDate(d);
  seconds.style.transform = "rotate(" + secondsAngle(d) + "deg)";
  minutes.style.transform = "rotate(" + minutesAngle(d) + "deg)";
  hours.style.transform = "rotate(" + hoursAngle(d) + "deg)";
}

const clock = document.getElementById("time");
const seconds = document.getElementById("seconds");
const minutes = document.getElementById("minutes");
const hours = document.getElementById("hours");

export default () => {
  updateClock();
  setInterval(updateClock, 1000);
};
