function updateClock() {

    const now = new Date();

    // 时间
    const time = now.toLocaleTimeString('zh-CN');

    // 日期
    const date = now.toLocaleDateString('zh-CN');

    // 星期
    const weeks = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
    ];

    const week = weeks[now.getDay()];

    // 时区
    const timezone =
        Intl.DateTimeFormat().resolvedOptions().timeZone;

    document.getElementById("clock").innerHTML =
        `
        <h2>${time}</h2>
        <p>${date}</p>
        <p>${week}</p>
        <p>时区：${timezone}</p>
        `;
}

updateClock();

setInterval(updateClock, 1000);