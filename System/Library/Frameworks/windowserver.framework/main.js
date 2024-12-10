function getP(i) {
    return document.querySelector(`p[${i}]`);
}

const datetime = getP('datetime');
const menu_logo = getP("logo");

function updateTime() {
    const currentDateTime = new Date();
    const hours = currentDateTime.getHours().toString().padStart(2, '0');
    const minutes = currentDateTime.getMinutes().toString().padStart(2, '0');
    let day = currentDateTime.getDate();
    let month = currentDateTime.getMonth() + 1;

    const days = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    let weekDay = days[currentDateTime.getDay()];

    day = day.toString();
    month = month.toString();

    datetime.innerHTML = month + '月' + day + '日' + ' ' + weekDay + ' ' + hours + ':' + minutes;
}

function getMaxZIndex() {
    let maxZIndex = 0;
    const elements = document.querySelectorAll('*');

    elements.forEach((element) => {
        const zIndex = window.getComputedStyle(element).zIndex;
        if (zIndex !== 'auto' && !isNaN(zIndex)) {
            maxZIndex = Math.max(maxZIndex, parseInt(zIndex, 10));
        }
    });

    return maxZIndex;
}

let applemenu;
let appleMenu_state = false;

function appleMenu() {
    if (!appleMenu_state) {
        menu_logo.style.background = '#fafafa60';
        menu_logo.style.textShadow = 'none';
        appleMenu_state = true;
        applemenu = new WidgetMenu();
        applemenu.setAttribute("x", "10");
        applemenu.setAttribute("y", "26");
        applemenu.setAttribute("width", "175");
        applemenu.setAttribute("content", "关于本机 hr 系统设置... App%20Store... hr 最近使用的项目 hr 强制退出... hr 睡眠 重新启动... 关机... hr 锁定屏幕 退出登录“Webintosh”...");
        applemenu.setAttribute("command", "none none none none none none none none none none");
        document.body.appendChild(applemenu);
        document.addEventListener('click', function (e) {
            if (!e.target.matches(applemenu)) {
                appleMenu();
            } else {
                menu_logo.style.background = 'none';
                menu_logo.style.textShadow = '0 2px 10px #000a;';
                appleMenu_state = false;
            }
        })
    } else {
        menu_logo.style.background = 'none';
        menu_logo.style.textShadow = '0 2px 10px #000a;';
        appleMenu_state = false;
        applemenu.style.opacity = 0;
        setTimeout(function () {
            document.body.removeChild(applemenu);
        }, 100);
    }
}

updateTime();
setInterval(updateTime, 10000);
