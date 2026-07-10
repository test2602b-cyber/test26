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

    <p>📅 ${date}</p>

    <p>📆 ${week}</p>

    <p>🌏 时区：${timezone}</p>

    <hr>

    <p>👤 第 <b>${count}</b> 次访问</p>

    <p>🕘 上次访问：${lastVisit}</p>
    `;
}

// ===== 本地访问计数 =====
let count = localStorage.getItem("visitCount");

if (count === null) {
    count = 1;
} else {
    count = parseInt(count) + 1;
}

updateClock();

// 保存本次访问时间，供下次显示
localStorage.setItem(
    "lastVisit",
    now.toLocaleString('zh-CN')
);

setInterval(updateClock, 1000);