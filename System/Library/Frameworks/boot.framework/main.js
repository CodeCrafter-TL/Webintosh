function getDiv(i) {
    return document.querySelector(`div[${i}]`);
}

function getP(i) {
    return document.querySelector(`p[${i}]`);
}

function getImg(i) {
    return document.querySelector(`img[${i}]`);
}

const process = getDiv("process");
const frame = getDiv("frame");
const proFrame = getDiv("processframe");
const state = getP("state");
const logo = getP("logo");
const logoImg = getImg("logo");
const fileList = [
    "../Frameworks/font.framework/PingFangSC-Regular.woff2",
    "../Frameworks/font.framework/sf-pro-display_regular.woff2",
    "../Frameworks/font.framework/PingFangSC-Semibold.woff2",
    "../Frameworks/font.framework/sf-pro-display_semibold.woff2",
    "../Frameworks/boot.framework/main.css",
    "../Frameworks/boot.framework/Unsupported.png",
    "./PlatformSupport.json",
    "../Frameworks/device.framework/MacPro.png",
    "./DefaultDesktop.png",
    "./DefaultBackground.png"
];

function fetchJSON(url, arrayName, element) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('网络响应失败');
            }
            return response.json();
        })
        .then(data => {
            if (data.hasOwnProperty(arrayName) && Array.isArray(data[arrayName])) {
                const array = data[arrayName];

                if (array.includes(element)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                throw new Error(`未找到指定的数组名称：${arrayName}`);
            }
        })
        .catch(error => {
            console.error('发生错误:', error);
        });
}

async function fileExists(filename) {
    try {
        const response = await fetch(filename, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        return false;
    }
}

function getQueryParam(param) {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
}

async function boot() {
    let platform = getQueryParam('platform');
    let freeze = false;
    if (!platform) {
        platform = 'Macmini8,1';
    }

    fetchJSON('./PlatformSupport.json', 'platform', platform)
        .then(result => {
            if (result) {
                console.log("Loaded SMBIOS: " + platform);
            } else {
                proFrame.style.background = "var(--boot-bg)";
                setTimeout(function () {
                    notSupported();
                }, 500);
                freeze = true;
            }
        });

    let anyFileExists = false;
    let fileExistsNum = 0;

    for (let filePath of fileList) {
        const exists = await fileExists(filePath);
        if (exists) {
            fileExistsNum += 1;
            anyFileExists = true;
            console.log("Verify sucess: " + filePath);
        } else {
            console.log("Verify abort: " + filePath);
            break;
        }
    }

    if (!freeze) {
        toLogond(anyFileExists, fileExistsNum);
    }
}

function toLogond(anyFileExists, fileExistsNum) {
    if (anyFileExists && fileExistsNum > 0) {
        process.style.width = (process.clientWidth + 10 * fileExistsNum) + "%";
        if (process.style.width == "100%") {
            setTimeout(function () {
                window.location = "./logond.html";
            }, 1750);   
        }
    }
}

window.onload = boot;

function notSupported() {
    frame.style.maxWidth = "none";
    frame.style.minWidth = "none";
    frame.style.width = "auto";
    frame.style.height = "auto";
    process.style.display = "none";
    logo.style.display = "none";
    logoImg.style.display = "block";
    state.style.display = "block";
}