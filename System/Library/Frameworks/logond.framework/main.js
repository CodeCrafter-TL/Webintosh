function getDiv(i) {
    return document.querySelector(`div[${i}]`);
}

function getP(i) {
    return document.querySelector(`p[${i}]`);
}

function getText(i) {
    return document.querySelector(`text#${i}`);
}

function getImg(i) {
    return document.querySelector(`img[${i}]`);
}

function getInput(i) {
    return document.querySelector(`input[${i}]`);
}

const overlay = getDiv('overlay');
setTimeout(function () {
    overlay.style.opacity = 0;
}, 200);

const timeSvg = getText('timeText');
const dateSvg = getText('dateText');
const timep = getP('time');
const datep = getP('date');
const password = getInput('password');
const svgFrame = getDiv('svgFrame');
const tip = getP('tip');
const passwords = [ // 明文给你放这了 自己去玩吧 :)
    "Ventura",
    "Sonoma",
    "Sequoia",
    "Webintosh"
];
const fileListHere = [
    "./wallpaper.html",
    "./Finder.app/MacOS/Finder.html",
    "./Dock.app/MacOS/Dock.html",
    "./Applications/aboutmac.html"
];
const rects = document.querySelectorAll('rect');
let opacityValues = [0.8, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7];
const fps = 30;
const frameDuration = 1000 / fps;
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

function updateTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');

    timeSvg.innerHTML = hours + ":" + minutes;
}

function updateDate() {
    const currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;

    const days = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    let weekDay = days[currentDate.getDay()];

    day = day.toString();
    month = month.toString();

    dateSvg.innerHTML = month + "月" + day + "日" + " " + weekDay;
}

function updateOpacity() {
    opacityValues = opacityValues.map(value => value - 0.1);
    opacityValues = opacityValues.map(value => value < 0 ? 0.8 : value);

    rects.forEach((rect, index) => {
        rect.setAttribute('fill-opacity', opacityValues[index]);
    });
}

function animate() {
    const now = performance.now();
    const deltaTime = now - lastFrameTime;

    if (deltaTime >= frameDuration) {
        updateOpacity();
        lastFrameTime = now;
    }

    requestAnimationFrame(animate);
}

async function fileExists(filename) {
    try {
        const response = await fetch(filename, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        return false;
    }
}

async function toDesktop() {
    password.style.display = 'none';
    tip.style.opacity = 0;
    svgFrame.style.display = 'block';

    let timeout = 0;
    for (let filePath of fileListHere) {
        const exists = await fileExists(filePath);
        if (exists) {
            timeout += 500;
        } else {
            break;
        }
    }

    await sleep(timeout);
    window.location = './windowserver.html';
}

async function invalidPassword(value = "Ventura Sonoma Sequoia 选一个吧") {
    password.style.transform = 'translateX(-60px)';
    await sleep(60);
    password.style.transform = 'translateX(90px)';
    await sleep(60);
    password.style.transform = 'translateX(-120px)';
    await sleep(60);
    password.style.transform = 'translateX(60px)';
    await sleep(60);
    password.style.transform = 'translateX(-90px)';
    await sleep(60);
    password.style.transform = 'translateX(40px)';
    await sleep(60);
    password.style.transform = 'translateX(-55px)';
    password.style.transform = 'translateX(0)';
    tip.innerHTML = value;
}

password.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        if (passwords.includes(password.value) && password.value !== "CoedCrafter-TL") {
            toDesktop();
        } else if (password.value == "CodeCrafter-TL") {
            invalidPassword("别拍马屁 好好看简介的密码或者再错一遍（");
        } else {
            invalidPassword();
        }
    }
});

updateTime();
setInterval(updateTime, 1200);
updateDate();
setInterval(updateDate, 10000);
let lastFrameTime = performance.now();
animate();