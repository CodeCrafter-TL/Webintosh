function getDiv(i) {
    return document.querySelector(`div[${i}]`);
}

function getP(i) {
    return document.querySelector(`p[${i}]`);
}

const dock = getDiv('dock');
const appname = getDiv("appname");

fetch('../../../Frameworks/dock.framework/dockitem.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        const itemsArray = data.items;
        const result = itemsArray.map(item => ({
            name: item[0],
            path: item[1]
        }));
        let i = 0;
        let icons = [];

        result.forEach(dockitem => {
            i += 1;
            if (i == 19) {
                let hr = document.createElement('hr');
                dock.appendChild(hr);
            }
            let icon = document.createElement('img');
            icon.src = dockitem.path + "./../../Resources/AppIcon.png";
            icon.alt = dockitem.name;
            icons.push(icon);
            dock.appendChild(icon);
        });

        icons.forEach(icon => {
            icon.addEventListener('click', () => {
                alert("您打开了应用程序: " + icon.alt);
            });
            icon.addEventListener('mouseover', () => {
                const event = new MouseEvent('mouseover', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                });
                icon.dispatchEvent(event);

                const iconrect = icon.getBoundingClientRect();
                appname.style.display = 'block';
                appname.style.top = `${iconrect.top - dock.clientHeight * 0.75}px`;
                appname.style.left = `${iconrect.left + (iconrect.width - appname.offsetWidth) / 2}px`;
                appname.innerHTML = icon.alt;
            });
            icon.addEventListener('mouseout', () => {
                appname.style.display = 'none';
            });
        });
    })
    .catch(error => {
        console.error('Error loading the JSON file:', error);
    });