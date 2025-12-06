import { getText, getP, getInput, getDiv } from './element.js';

const overlay = getDiv('overlay');
setTimeout(function () {
    overlay.style.opacity = 0;
}, 200);

const timeSvg = getText('timeText');
const dateSvg = getText('dateText');
const password = getInput('password');
const svgFrame = getDiv('svgFrame');
const tip = getP('tip');
const passwords = [ // 明文放这了 去玩吧 :)
    "Ventura",
    "Sonoma",
    "Sequoia",
    "Webintosh"
];
const fileListHere = [
    "../Apps/Wallpaper.html",
    "../Desktop/index.html",
    "../Apps/Dock.html",
    "../assets/images/MacPro.png"
];
const rects = document.querySelectorAll('rect');
let opacityValues = [0.8, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7];
const fps = 30;
const frameDuration = 1000 / fps;
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

// Svg Positioning
function svg() {
    let timeSvgRect = timeSvg.getBoundingClientRect();
    let dateSvgRect = dateSvg.getBoundingClientRect();

    let timePos = (document.body.clientWidth - timeSvgRect.width) / 2;
    let datePos = (document.body.clientWidth - dateSvgRect.width) / 2;

    timeSvg.setAttribute('x', timePos);
    dateSvg.setAttribute('x', datePos);
}

svg();

function updateTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');

    timeSvg.innerHTML = hours + ":" + minutes;
    svg();
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
    svg();
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
    window.location = '/Webintosh-Desktop';
}

async function invalidPassword(value = "Ventura Sonoma Sequoia 选一个吧") {
    password.style.transform = 'translateX(-60px)';
    await sleep(60);
    password.style.transform = 'translateX(90px)';
    await sleep(60);
    password.style.transform = 'translateX(-120px)';
    await sleep(50);
    password.style.transform = 'translateX(60px)';
    await sleep(60);
    password.style.transform = 'translateX(-90px)';
    await sleep(40);
    password.style.transform = 'translateX(40px)';
    await sleep(50);
    password.style.transform = 'translateX(-55px)';
    password.style.transform = 'translateX(0)';
    tip.innerHTML = value;
}

password.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        if (!passwords.includes(password.value)) {
            invalidPassword();
            return;
        }
        toDesktop();
    }
});

window.addEventListener('resize', svg);

updateTime();
setInterval(updateTime, 1200);
updateDate();
setInterval(updateDate, 10000);
let lastFrameTime = performance.now();
animate();