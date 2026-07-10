function updateClock() {
    const now = new Date();

    const time = now.toLocaleTimeString();

    document.getElementById("clock").innerHTML = time;
}

updateClock();

setInterval(updateClock, 1000);