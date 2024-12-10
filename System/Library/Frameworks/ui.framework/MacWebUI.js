// Widget: Button (Primary and Normal)
class WidgetButton extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const style = document.createElement('style');
        style.innerHTML = `/* By MacWebUI */
widget-button[primary] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 47px;
    width: auto;
    max-width: 100vw;
    height: 22px;
    border-radius: 5px;
    box-shadow: 0 0 3px 0 rgba(255, 255, 255, 0.12),
    0 1px 2px 0 rgba(255, 255, 255, 0.12),
    0 0 1px 0 rgba(255, 255, 255, 0.24);
    background-image: linear-gradient(179deg, rgba(255, 255, 255, 0.17) 0%, rgba(255, 255, 255, 0.00) 96%),
    linear-gradient(to bottom right, #2277ff, #0c61ff);
    background-size: 100% 100%;
    font-size: 11px;
    color: #fff;
    font-family: 'SFPro-Regular', 'PingFang-Regular';
    padding: 0 5px;
    user-select: none;
    -webkit-user-select: none;
    cursor: default;
}
widget-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 47px;
    width: auto;
    max-width: 100vw;
    height: 22px;
    border-radius: 5px;
    border: 0.5px solid rgba(0,0,0,0.02);
    background-color: #fff;
    font-size: 11px;
    color: #000;
    font-family: 'SFPro-Regular', 'PingFang-Regular';
    padding: 0 5px;
    user-select: none;
    -webkit-user-select: none;
    box-shadow: 0 0 0 0 rgba(0,0,0,0.15), 0 1px 0 0 rgba(0,0,0,0.05);
    cursor: default;
}`;
        let p_style = `margin: 0; padding: 0; height: 50%;`;
        const p = document.createElement('p');
        p.innerHTML = this.innerHTML;
        p.setAttribute('style', p_style);

        document.head.appendChild(style);
        shadow.appendChild(p);

        function start_click() {
            this.style.filter = 'brightness(90%)';
        }
        function end_click() {
            this.style.filter = 'none';
        }

        this.addEventListener('mousedown', start_click);
        p.addEventListener('mousedown', start_click);
        this.addEventListener('mouseup', end_click);
        p.addEventListener('mouseup', end_click);
    }
}

// Widget: Menu
class WidgetMenu extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        const style = document.createElement('style');
        style.innerHTML = `/* By MacWebUI */
widget-menu {
    width: auto;
    height: auto;
    position: absolute;
    transition: opacity 0.1s ease;
}`;
        const shadow_style = document.createElement('style');
        shadow_style.innerHTML = `/* By WebMacUI */
#frame {
    width: auto;
    height: auto;
    border-radius: 8px;
    background-color: #f6f6f699;
    backdrop-filter: blur(50px);
    -webkit-backdrop-filter: blur(50px);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15), 0 8px 15px 6px rgba(0, 0, 0, 0.18);
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    font-family: 'SFPro-Regular', 'PingFang-Regular';
    padding: 3.5px 5px;
    z-index: 1024;
    transition: opacity 0.25s ease-out;
}

#content {
    margin: 0;
    color: #000;
    width: calc(100% - 10px);
    height: auto;
    padding: 1.5px 5px;
    border-radius: 5px;
    font-size: 13px;
    background-color: transparent;
}

#hr {
    margin-top: 1.5px;
    margin-bottom: 1.5px;
    border: none;
    width: calc(100% - 10px);
    height: 1px;
    background-color: #fafafa80;
}

#content:hover {
    background-color: #0a82ffdd;
    border-radius: 5px;
    color: #fff;
    cursor: default;
}`

        document.head.appendChild(style);
        shadow.appendChild(shadow_style);
    }

    connectedCallback() {
        const shadow = this.shadowRoot;
        const contents = this.getAttribute('content')?.split(' ') || [];
        const commands = this.getAttribute('command')?.split(' ') || [];
        const this_width = this.getAttribute('width');
        const x = this.getAttribute('x');
        const y = this.getAttribute('y');
        this.style.top = y + 'px';
        this.style.left = x + 'px';
        const frame = document.createElement('div');
        frame.id = 'frame';
        if (this_width) {
            this.style.width = this_width + 'px';
            frame.style.width = '100%';
        }
        shadow.appendChild(frame);

        contents.forEach((item, index) => {
            if (item != 'hr') {
                const now_p = document.createElement('p');
                now_p.innerHTML = item.replace('%20', ' ');
                now_p.id = 'content';
                frame.appendChild(now_p);

                now_p.addEventListener('mouseup', () => {
                    now_p.style.backgroundColor = 'transparent';
                    now_p.style.color = '#000';

                    setTimeout(() => {
                        now_p.style.backgroundColor = '#0A82FF';
                        now_p.style.color = '#fff';
                        setTimeout(() => {
                            this.style.display = 'none';
                            if (commands[index]) {
                                eval(commands[index]);
                            }
                        }, 75);
                    }, 100);
                });
            } else {
                const now_hr = document.createElement('hr');
                now_hr.id = 'hr';
                frame.appendChild(now_hr);
            }
        });
    }
}

// Widget: Switch (Or Checked)
class WidgetSwitch extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const style = document.createElement('style');
        style.innerHTML = `/* By MacWebUI */
widget-switch {
    width: auto;
    height: auto;
}`;
        const shadow_style = document.createElement('style');
        shadow_style.innerHTML = `/* By MacWebUI */
#input {
    display: none;
}

#input:checked + .slider {
    background: #217cff;
}

#input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
}

#input:checked + .slider:before {
    transform: translateX(14.5px);
}

.slider {
    position: relative;
    transition: background 0.375s;
    background: rgba(0, 0, 0, 0.1);
    box-shadow: inset 0 0 1px 0 rgba(0,0,0,0.02), inset 0 0 1px 0 rgba(0,0,0,0.12);
    width: 32px;
    height: 18px;
    margin: 0;

    &:before {
        position: absolute;
        content: "";
        height: 13.5px;
        width: 13.5px;
        left: 1.25px;
        top: 1.25px;
        background-color: #fff;
        transition: 0.375s;
        border: 0.5px solid rgba(0,0,0,0.02);
        box-shadow: 0 0 0 0 rgba(0,0,0,0.15);
    }
}

.round {
    border-radius: 12px;

    &:before {
        border-radius: 50%;
    }
}`;

        const input = document.createElement('input');
        const frame = document.createElement('div');
        const command = this.getAttribute('command');
        input.type = 'checkbox';
        input.id = 'input';
        if (this.getAttribute('state') == 'checked') {
            input.setAttribute('checked', '')
        }
        frame.classList.add('slider', 'round');

        frame.addEventListener('mouseup', function () {
            input.checked = !input.checked;

            if (input.checked) {
                setTimeout(function () { eval(command); }, 75);
            }
        });

        document.head.appendChild(style);
        shadow.appendChild(shadow_style);
        shadow.appendChild(input);
        shadow.appendChild(frame);
    }
}

// Container: Window
class ContainerWindow extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const style = document.createElement('style');
        style.innerHTML = `/* By MacWebUI */
container-window {
    border-radius: 10px;
    position: absolute;
    box-shadow: 0 18px 100px 0 rgba(0,0,0,0.20), 0 0 1.5px 0 rgba(0,0,0,0.275);
    background-color: #fff;
    resize: both;
    overflow: auto;
    &::-webkit-resizer {
        background: transparent;
    }
}`;
        const shadow_style = document.createElement('style');
        shadow_style.innerHTML = `/* By MacWebUI */
#wintools {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: auto;
    height: auto;
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    user-select: none;
    -webkit-user-select: none;
}

#red {
    cursor: default;
    font-size: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #ff5f57;
    margin-right: 6px;
}

#yellow {
    cursor: default;
    font-size: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #febc2e;
    margin-right: 6px;
}

#green {
    cursor: default;
    font-size: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #28c840;
}

#header {
    z-index: 0;
    white-space: nowrap;
    overflow: hidden;
    cursor: default;
    user-select: none;
    -webkit-user-select: none;
    border-radius: 10px 10px 0 0;
    position: relative;
    top: -2px;
    left: 0;
    width: 0px;
    height: 22px;
    background-color: #f5f5f5ee;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.15);
}

#tit {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 45%;
    margin: 0;
    text-align: center;
    font-family: 'SFPro-Bold', 'PingFang-Bold';
    font-size: 13px;
}`
        const wintools = document.createElement('div');
        wintools.id = 'wintools';
        const red = document.createElement('div');
        red.id = 'red';
        const yellow = document.createElement('div');
        yellow.id = 'yellow';
        const green = document.createElement('div');
        green.id = 'green';
        const header = document.createElement('header');
        header.id = 'header';
        const tit = document.createElement('p');
        tit.id = 'tit';
        const content = document.createElement('div');
        content.innerHTML = this.innerHTML;
        let width = this.getAttribute('width');
        let height = this.getAttribute('height');
        let x = this.getAttribute('x');
        let y = this.getAttribute('y');
        let title = this.getAttribute('title');
        let commands = new Array();
        commands[0] = this.getAttribute('one');
        commands[1] = this.getAttribute('two');
        commands[2] = this.getAttribute('three');
        this.style.width = width + 'px';
        this.style.height = height + 'px';
        this.style.top = y + 'px';
        this.style.left = x + 'px';
        header.style.width = '100%';
        wintools.style.top = 6 + 'px';
        wintools.style.left = 8 + 'px';
        tit.innerHTML = title;
        document.head.appendChild(style);
        shadow.appendChild(wintools);
        shadow.appendChild(header);
        shadow.appendChild(shadow_style);
        wintools.appendChild(red);
        wintools.appendChild(yellow);
        wintools.appendChild(green);
        header.appendChild(tit);
        shadow.appendChild(content);

        function start_enter() {
            red.innerHTML = '✕';
            yellow.innerHTML = '—';
            green.innerHTML = '□';
        }
        function end_enter() {
            red.innerHTML = '';
            yellow.innerHTML = '';
            green.innerHTML = '';
        }
        function start_click(event) {
            event.target.style.filter = 'brightness(90%)';
        }
        function end_click(event) {
            event.target.style.filter = 'none';
        }

        wintools.addEventListener('mouseover', start_enter);
        wintools.addEventListener('mouseout', end_enter);
        red.addEventListener('mousedown', start_click);
        yellow.addEventListener('mousedown', start_click);
        green.addEventListener('mousedown', start_click);
        red.addEventListener('mouseup', end_click);
        yellow.addEventListener('mouseup', end_click);
        green.addEventListener('mouseup', end_click);
    }
}

// Container: MessageBox
class ContainerMessageBox extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        const style = document.createElement('style');
        style.innerHTML = `/* By MacWebUI */
container-messagebox {
    width: auto;
    height: auto;
    padding: 16px;
    position: fixed;
    background-color: #fffa;
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    border-radius: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    user-select: none;
    -webkit-user-select: none;
    animation: messagebox 0.4s linear forwards;
}
    
@keyframes messagebox {
    0% {
        opacity: 0;
        box-shadow: none;
        transform: scale(0.1);
    }

    50% {
        transform: scale(0.5);
    }

    80% {
        transform: scale(1.1);
    }

    100% {
        opacity: 1;
        transform: scale(1);
        box-shadow: 0 18px 100px 0 rgba(0,0,0,0.20), 0 0 1.5px 0 rgba(0,0,0,0.275);
    }
}`;
        const shadow_style = document.createElement('style');
        shadow_style.innerHTML = `/* By MacWebUI */
#icon {
    width: 64px;
    height: 64px;
}

#title {
    font-weight: normal;
    margin: 0;
    margin-top: 15px;
    font-size: 18px;
    font-family: 'SFPro-Bold', 'PingFang-Bold';
}

#text {
    margin: 0;
    font-size: 14px;
    margin-top: 6px;
    font-family: 'SFPro-Regular', 'PingFang-Regular';
}
    
#btn {
    font-size: 15px;
    text-align: center;
    line-height: 16px;
    width: 228px;
    height: 28px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background-image: linear-gradient(179deg, rgba(255, 255, 255, 0.17) 0%, rgba(255, 255, 255, 0.00) 96%), linear-gradient(to bottom right, #2277ff, #0c61ff);
    background-size: 100% 100%;
    color: #fff;
    font-family: 'SFPro-Regular', 'PingFang-Regular';
    margin-top: 12px;
}`;
        const msgbox = this;
        this.style.top = this.getAttribute('y') + 'px';
        this.style.left = this.getAttribute('x') + 'px';
        this.style.zIndex = 1024;
        const title = this.getElementsByTagName('h1')[0];
        const text = this.getElementsByTagName('p')[0];
        const button = this.getElementsByTagName('p')[1];
        const icon = this.getElementsByTagName('img')[0];
        const tit = document.createElement('h1');
        tit.id = 'title';
        const txt = document.createElement('p');
        txt.id = 'text';
        const icn = document.createElement('img');
        icn.id = 'icon';
        icn.setAttribute('src', icon.getAttribute('src'));
        const btn = document.createElement('div');
        btn.id = 'btn';
        btn.innerHTML = button.innerHTML;
        tit.innerHTML = title.innerHTML;
        txt.innerHTML = text.innerHTML;

        const command = this.getAttribute('command');

        function start_click(e, _this) {
            btn.style.filter = 'brightness(120%)';
        }
        function end_click() {
            btn.style.filter = 'brightness(100%)';
            msgbox.style.display = 'none';
            eval(command);
        }

        shadow.appendChild(shadow_style);
        shadow.appendChild(icn);
        shadow.appendChild(tit);
        shadow.appendChild(txt);
        shadow.appendChild(btn);
        document.head.appendChild(style);
        btn.addEventListener('mousedown', function (event) {
            start_click(event, this);
        });
        btn.addEventListener('mouseup', end_click);
    }
}

// Custom Elements Definion
customElements.define('widget-switch', WidgetSwitch);
customElements.define('widget-menu', WidgetMenu);
customElements.define('container-messagebox', ContainerMessageBox);
customElements.define('container-window', ContainerWindow);
customElements.define('widget-button', WidgetButton);