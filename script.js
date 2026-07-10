// ================================
// 页面初始化
// ================================
initPage();

// 每秒更新时间
setInterval(updateClock, 1000);

// ================================
// 初始化页面
// ================================
function initPage() {

    updateVisitInfo();

    updateClock();
}

// ================================
// 更新时间
// ================================
function updateClock() {

    const now = new Date();

    const time = now.toLocaleTimeString('zh-CN');
    const date = now.toLocaleDateString('zh-CN');

    const weeks = [
        "星期日","星期一","星期二",
        "星期三","星期四","星期五","星期六"
    ];

    const week = weeks[now.getDay()];

    const timezone =
        Intl.DateTimeFormat().resolvedOptions().timeZone;

    // 取得访问信息
    let count = localStorage.getItem("visitCount");
    let lastVisit = localStorage.getItem("lastVisit");

    if (lastVisit == null)
        lastVisit = "第一次访问";

    document.getElementById("clock").innerHTML =
    `
    <h2>${time}</h2>

    <p>📅 ${date}</p>

    <p>📆 ${week}</p>

    <p>🌏 ${timezone}</p>

    <hr>

    <p>👤 第 <b>${count}</b> 次访问</p>

    <p>🕘 上次访问：${lastVisit}</p>
    `;
}

// ================================
// 更新访问信息
// ================================
function updateVisitInfo() {

    let count = localStorage.getItem("visitCount");

    if (count == null)
        count = 1;
    else
        count = parseInt(count) + 1;

    localStorage.setItem("visitCount", count);

    localStorage.setItem(
        "lastVisit",
        new Date().toLocaleString('zh-CN')
    );
}