let li = null, sound = new Audio(), elsec = 31;
sound.src = "../sound/detected.mp3";
let shindobackcolor = {
    '1': { r: 142, g: 142, b: 155 },
    '2': { r: 0, g: 170, b: 255 },
    '3': { r: 0, g: 65, b: 255 },
    '4': { r: 250, g: 160, b: 110 },
    '5弱': { r: 225, g: 160, b: 0 },
    '5強': { r: 255, g: 153, b: 0 },
    '6弱': { r: 255, g: 40, b: 0 },
    '6強': { r: 165, g: 0, b: 33 },
    '7': { r: 180, g: 0, b: 104 },
    '---': { r: 255, g: 255, b: 255}
};
var sl = ['1', '2', '3', '4', '5弱', '5強', '6弱', '6強', '7', '---'];
function getinfo() {
    fetch('https://typhoon.yahoo.co.jp/weather/jp/earthquake/list/')
        .then(r => r.text())
        .then(r => {
            const q = r.split('<tr bgcolor="#ffffff" valign=middle>');
            const eqtile = document.getElementById('qi');
            eqtile.innerHTML = "";
            for (let i = 1; i < 5; i++) {
                const w = q[i].split('<td align=center>');
                const link = w[0].substr(0, w[0].indexOf('\">')).substr(w[0].indexOf('f="') + 3);
                const time = w[0].substr(0, w[0].indexOf('</a>')).substr(w[0].indexOf('\">') + 2).replace('ごろ', '発生').substr(5);
                const center = w[1].substr(0, w[1].indexOf('<'));
                const magnitude = w[2].substr(0, w[2].indexOf('<'));
                const maxintensity = w[3].substr(0, w[3].indexOf('<'));
                if (i == 1) {
                    if (li !== time && li !== null) {
                        sound.play();
                        if (document.getElementById('readinfo').checked) {
                            let message = "最大震度" + String(maxintensity) + "の地震が発生しました。";
                            if (center !== "---" && magnitude !== "---") {
                                message += "震源は" + center + "、マグニチュードは" + magnitude + "と推定されています。";
                            }
                            speechSynthesis.speak(new SpeechSynthesisUtterance(message));
                        }
                        if (document.getElementById('autochange').checked) {
                            document.getElementById('r3').checked = true;
                            setTimeout(function () {
                                document.getElementById('r4').checked = true;
                            }, 30000);
                        }
                        chrome.windows.getCurrent((window) => {
                            const windowId = window.id;
                            chrome.windows.update(windowId, {
                                focused: true
                            })
                        });
                    }
                    li = time;
                }
                const block = document.createElement('div');
                const span = document.createElement('span');
                const img = document.createElement('img');
                const color = shindobackcolor[maxintensity];
                block.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
                block.id = `tile${i}`;
                block.style.border = "1px solid black";
                block.style.position = "relative";
                block.style.cursor = "pointer";
                block.title = "クリックで詳細表示（Yahoo地震情報に飛びます）";
                span.style.fontSize = `16px`;
                const b = '  ';
                span.innerHTML = `${time}<br><span style='font-size: 17px'>${center}` + b + `M${magnitude}`;
                img.src = `../images/shindoicon/${maxintensity.replace('弱', '-').replace('強', '+')}.png`;
                img.height = 42;
                img.style.position = 'absolute';
                img.style.right = 0;
                img.style.top = 0;
                block.addEventListener('click', function () {
                    window.open('https://typhoon.yahoo.co.jp' + link);
                })
                block.appendChild(span);
                block.appendChild(img);
                eqtile.appendChild(block);
            }
        })
    elsec = 31;
}
getinfo();
setInterval(getinfo, 30000);
setInterval(function () {
    elsec -= 1;
    document.getElementById('gettime').innerHTML = `${elsec}秒後に再取得`;
}, 1000)