const colors = ["royalblue", "crimson", "seagreen", "darkorange", "purple"];
let colorIndex = 0;
const visits = Number(localStorage.getItem("pageVisits") || 0) + 1;

localStorage.setItem("pageVisits", visits);
document.getElementById("visitor-count").textContent = visits;

document.getElementById("color-button").addEventListener("click", () => {
  colorIndex = (colorIndex + 1) % colors.length;
  document.getElementById("hello-text").style.color = colors[colorIndex];
});

function formatTime(timeZone, locale) {
  return new Date().toLocaleString(locale, {
    timeZone,
    dateStyle: "medium",
    timeStyle: "medium",
  });
}

function updateDateTime() {
  document.getElementById("date-time").textContent = new Date().toLocaleString();
  document.getElementById("singapore-time").textContent = formatTime("Asia/Singapore", "en-SG");
  document.getElementById("uk-time").textContent = formatTime("Europe/London", "en-GB");
  document.getElementById("us-time").textContent = formatTime("America/New_York", "en-US");
}

updateDateTime();
setInterval(updateDateTime, 1000);
