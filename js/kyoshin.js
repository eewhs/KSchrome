let mainint = null, places = null, colordata = null, tcolors = [], linex = 6, liney = -1, audio1 = new Audio(), audio2 = new Audio(), audio3 = new Audio(), audio4 = new Audio(), timeoffset = null;
tcolors['00cd'] = "b"; tcolors['07d1'] = "b"; tcolors['0ed6'] = "b"; tcolors['015da'] = "b"; tcolors['01cdf'] = "b"; tcolors['024e3'] = "b"; tcolors['02be7'] = "b"; tcolors['032ec'] = "b"; tcolors['039f0'] = "b"; tcolors['040f5'] = "b"; tcolors['048fa'] = "b"; tcolors['055ee'] = "b"; tcolors['063e3'] = "b"; tcolors['070d8'] = "b"; tcolors['07ecd'] = "b"; tcolors['08cc2'] = "b"; tcolors['099b7'] = "b"; tcolors['0a7ac'] = "g"; tcolors['0b4a1'] = "g"; tcolors['0c296'] = "g"; tcolors['0d08b'] = "g"; tcolors['6d482'] = "g"; tcolors['cd879'] = "g"; tcolors['12dc71'] = "g"; tcolors['19e068'] = "g"; tcolors['1fe460'] = "g"; tcolors['25e958'] = "g"; tcolors['2ced4f'] = "g"; tcolors['32f147'] = "g"; tcolors['38f53e'] = "g"; tcolors['3ffa36'] = "g"; tcolors['4bfa31'] = "g"; tcolors['58fa2d'] = "g"; tcolors['64fb29'] = "g"; tcolors['71fb25'] = "g"; tcolors['7dfc21'] = "y"; tcolors['8afc1c'] = "y"; tcolors['97fd18'] = "y"; tcolors['a3fd14'] = "y"; tcolors['b0fe10'] = "y"; tcolors['bdffc'] = "y"; tcolors['c3fea'] = "y"; tcolors['cafe9'] = "y"; tcolors['d0fe8'] = "y"; tcolors['d7fe7'] = "y"; tcolors['deff5'] = "y"; tcolors['e4fe4'] = "y"; tcolors['ebff3'] = "y"; tcolors['f1fe2'] = "y";
tcolors['f8ff1'] = "y"; tcolors['ffff0'] = "y"; tcolors['fefb0'] = "y"; tcolors['fef80'] = "y"; tcolors['fef40'] = "y"; tcolors['fef10'] = "y"; tcolors['ffee0'] = "y"; tcolors['feea0'] = "y"; tcolors['ffe70'] = "y"; tcolors['fee30'] = "y"; tcolors['ffe00'] = "y"; tcolors['ffdd0'] = "y"; tcolors['fed50'] = "y"; tcolors['fecd0'] = "y"; tcolors['fec50'] = "y"; tcolors['febe0'] = "y"; tcolors['ffb60'] = "y"; tcolors['feae0'] = "y"; tcolors['ffa70'] = "y"; tcolors['fe9f0'] = "y"; tcolors['ff970'] = "y"; tcolors['ff900'] = "y"; tcolors['fe880'] = "y"; tcolors['fe800'] = "y"; tcolors['fe790'] = "y"; tcolors['fe710'] = "y"; tcolors['ff6a0'] = "r"; tcolors['fe620'] = "r"; tcolors['ff5a0'] = "r"; tcolors['fe530'] = "r"; tcolors['ff4b0'] = "r"; tcolors['ff440'] = "r"; tcolors['fe3d0'] = "r"; tcolors['fd360'] = "r"; tcolors['fc2f0'] = "r"; tcolors['fb280'] = "r"; tcolors['fa210'] = "r"; tcolors['f91b0'] = "r"; tcolors['f8140'] = "r"; tcolors['f7d0'] = "r"; tcolors['f660'] = "r"; tcolors['f500'] = "r"; tcolors['ee00'] = "r"; tcolors['e600'] = "r"; tcolors['df00'] = "r"; tcolors['d700'] = "r"; tcolors['d000'] = "r"; tcolors['c800'] = "r"; tcolors['c000'] = "r"; tcolors['b900'] = "r"; tcolors['b100'] = "r"; tcolors['aa00'] = "r";
const prefs = ['すべての県', '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県', '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県', '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県', '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'];
const kcan = document.getElementById('map_kyoshin'), kctx = kcan.getContext('2d'), wcan = document.getElementById('wave'), wctx = wcan.getContext('2d'), hcan = document.createElement('canvas'), hctx = hcan.getContext('2d'), hcan2 = document.createElement('canvas'), hctx2 = hcan2.getContext('2d');
hcan.width = "352", hcan.height = "400", hcan2.width = "352", hcan2.height = "400", wctx.lineWidth = 2;
audio1.src = "../sound/eew.wav", audio2.src = "../sound/warning.mp3", audio3.src = "../sound/first.mp3", audio4.src = "../sound/final.mp3";
document.getElementById('intval').addEventListener('change', function (e) {
    clearInterval(mainint);
    mainint = setInterval(main, e.target.value * 1000);
    document.getElementById('inttx').innerHTML = "画像更新間隔：" + e.target.value + "秒";
});
document.getElementById('obpoint').addEventListener('change', (e) => {
    chrome.storage.local.set({ loc: e.target.value });
});
document.getElementById('intval').addEventListener('change', (e) => {
    chrome.storage.local.set({ intval: e.target.value });
});
document.getElementById('btype1').addEventListener('change', (e) => {
    chrome.storage.local.set({ imgtype: e.target.value });
})
document.getElementById('psdisp').addEventListener('change', (e) => {
    chrome.storage.local.set({ psdisp: e.target.checked });
})
document.getElementById('opensetting').addEventListener('click', function() {
    if (window.innerHeight > 405) {
        window.resizeTo(362, 430);
    } else {
        window.resizeTo(362, 650);
    }
})
fetch('https://api.wolfx.jp/ntp.json').then(r => r.json()).then(r => {
    timeoffset = r.timestamp - Date.now();
});
function addoption(pre) {
    document.getElementById('obpoint').innerHTML = "";
    let obpnum = 1090;
    chrome.storage.local.get(['loc'], (r) => {
        obpnum = r.loc;
        for (let i = 0; i < places.length - 1; i++) {
            if (pre !== "すべての県" && pre !== places[i].Region || places[i].Region == "その他") { } else {
                const obsel = document.createElement('option');
                obsel.value = i;
                obsel.innerHTML = places[i].Region + " " + places[i].Name + `(${places[i].Type})`;
                if (i == obpnum) {
                    obsel.selected = true;
                }
                document.getElementById('obpoint').appendChild(obsel);
            }
        }
    });
}
fetch('../jsons/placenames.json').then(r => r.json()).then(r => {
    places = r;
    for (let i = 0; i < prefs.length; i++) {
        const presel = document.createElement('option');
        presel.value = prefs[i];
        presel.innerHTML = prefs[i];
        document.getElementById('pref').appendChild(presel);
    }
    addoption('すべての県');
    document.getElementById('pref').addEventListener('change', function (e) {
        addoption(e.target.value);
    });
});
chrome.storage.local.get(['intval'], (r) => {
    if (r.intval !== undefined) {
        document.getElementById('intval').value = r.intval;
        clearInterval(mainint);
        mainint = setInterval(main, r.intval * 1000);
    }
});
chrome.storage.local.get(['imgtype'], (r) => {
    if (r.imgtype !== undefined) {
        document.getElementById('btype1').value = r.imgtype;
    }
});
chrome.storage.local.get(['psdisp'], (r) => {
    if (r.psdisp !== undefined) {
        document.getElementById('psdisp').checked = r.psdisp;
    }
})
fetch('../jsons/colors.json').then(r => r.json()).then(r => { colordata = r; });
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    let r = message.txt;
    if (r.type !== "heartbeat") {
        if (r.Serial == 1) {
            audio3.play();
        } else {
            if (r.isFinal) {
                audio4.play();
            } else {
                audio1.play();
            }
        }
        let magnitude = String(r.Magunitude);
        let magdep = "";
        if (r.isAssumption) {
            magdep = "PLUM法による仮定震源要素";
        } else {
            magdep = `M<span style='font-size: 25px;'>${magnitude}</span> 深さ:<span style='font-size: 25px;'>${r.Depth}</span>KM`;
        }
        if (magnitude.length == 1) { magnitude += ".0"; }
        document.getElementById('eewinfo').innerHTML = `${r.Title} #${r.Serial}${(r.isFinal) ? "（最終）": ""}<br>${r.OriginTime}<br>${r.Hypocenter}<br>最大<span style='font-size: 25px;'>${r.MaxIntensity.replace('-', '弱').replace('+', '強')}</span>  ${magdep}`;
        if (!r.isWarn) {
            document.getElementById('eewinfo').style.background = "#666";
        } else {
            if (document.getElementById('eewinfo').style.background == "#666") {
                audio2.play();
            }
            document.getElementById('eewinfo').style.background = "#fa3b2d";
        }
        if (r.isCancel) {
            document.getElementById('eewinfo').innerHTML = "キャンセルされました";
        }
        chrome.windows.getCurrent((window) => {
            const windowId = window.id;
            chrome.windows.update(windowId, {
                focused: true
            })
        });
    }
});
function putimage(imagelink) {
    return new Promise((resolve) => {
        const image = new Image();
        image.onload = () => { resolve(image); };
        image.src = imagelink;
    });
};
async function main() {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const late = Number(document.getElementById('timebar').value);
    const jstTime = new Date(utc + 9 * 60 * 60000 + late * 60000 - 1800 + timeoffset);
    const year = jstTime.getFullYear();
    const month = ('00' + (jstTime.getMonth() + 1)).slice(-2);
    const date = ('00' + jstTime.getDate()).slice(-2);
    const hour = ('00' + jstTime.getHours()).slice(-2);
    const minute = ('00' + jstTime.getMinutes()).slice(-2);
    const second = ('00' + jstTime.getSeconds()).slice(-2);
    const timeStr = `${year}${month}${date}${hour}${minute}${second}`;
    const imgtype = document.getElementById('btype1').value;
    const depth = (document.getElementById('bsurface').checked) ? "s" : "b";
    document.getElementById('late').innerHTML = (late == 0) ? "最新" : `${-late}分前`;
    document.getElementById('pswave').src = (document.getElementById('psdisp').checked) ? `http://www.kmoni.bosai.go.jp/data/map_img/PSWaveImg/eew/${timeStr.substr(0, 8)}/${timeStr}.eew.gif` : '';
    const kimg = await putimage(`http://www.kmoni.bosai.go.jp/data/map_img/RealTimeImg/${imgtype}_${depth}/${timeStr.substr(0, 8)}/${timeStr}.${imgtype}_${depth}.gif`);
    const kimg2 = (depth == "s" && imgtype == "jma") ? kimg : await putimage(`http://www.kmoni.bosai.go.jp/data/map_img/RealTimeImg/jma_s/${timeStr.substr(0, 8)}/${timeStr}.jma_s.gif`);
    const kimg3 = (depth == "s" && imgtype == "acmap") ? kimg : await putimage(`http://www.kmoni.bosai.go.jp/data/map_img/RealTimeImg/acmap_s/${timeStr.substr(0, 8)}/${timeStr}.acmap_s.gif`);
    hctx.clearRect(0, 0, 352, 400);
    hctx.drawImage(kimg2, 0, 0, 352, 400);
    hctx2.clearRect(0, 0, 352, 400);
    hctx2.drawImage(kimg3, 0, 0, 352, 400);
    kctx.clearRect(0, 0, 352, 400);
    kctx.fillStyle = "#fff";
    kctx.font = "17px sans-serif";
    kctx.fillText(`${year}/${month}/${date} ${hour}:${minute}:${second}`, 185, 398);
    kctx.drawImage(kimg, 0, 0, 352, 400);
    const type = { T: 0, R: 0, Y: 0, G: 0, B: 0, F: 0 };
    for (let i = 0; i < places.length - 1; i++) {
        const x = places[i].Point.X;
        const y = places[i].Point.Y;
        const rgb = hctx2.getImageData(x, y, 1, 1).data;
        const R = rgb[0];
        const G = rgb[1];
        const B = rgb[2];
        let colorsnd = undefined;
        for (const i of colordata) {
            if (Math.abs(R - i.R) < 4 && Math.abs(G - i.G) < 4 && Math.abs(B - i.B) < 4) {
                colorsnd = tcolors[`${i.R.toString(16)}${i.G.toString(16)}${i.B.toString(16)}`];
                break;
            }
        }
        if (i == Number(document.getElementById('obpoint').value)) {
            const shindorgb = hctx.getImageData(x, y, 1, 1).data;
            kctx.fillStyle = "#444";
            kctx.fillRect(185, 345, 160, 37);
            kctx.fillStyle = "#fff";
            kctx.font = "14px Meiryo UI";
            kctx.fillText(places[i].Region + " " + places[i].Name, 185, 360);
            kctx.font = "11px Meiryo UI";
            kctx.fillText('震度', 185, 377);
            kctx.fillText('加速度', 260, 377);
            kctx.fillStyle = `rgb(${shindorgb[0]}, ${shindorgb[1]}, ${shindorgb[2]})`;
            kctx.fillRect(210, 365, 45, 15);
            kctx.fillStyle = `rgb(${R}, ${G}, ${B})`;
            kctx.fillRect(298, 365, 45, 15);
        }
        if (colorsnd == "b") { type.B += 1 };
        if (colorsnd == "g") { type.G += 1 };
        if (colorsnd == "y") { type.Y += 1; };
        if (colorsnd == "r") { type.R += 1; };
        if (R == 0 && G == 0 && B == 0 || colorsnd == undefined) { type.F += 1 };
        type.T += 1;
    }
    const total = 352 * ((type.R + type.Y + type.G) / (type.T - type.F));
    wctx.strokeStyle = `rgb(${type.R % 255}, ${type.Y % 255}, ${type.G % 255})`;
    wctx.beginPath();
    wctx.moveTo(176 - total / 2, 0);
    wctx.lineTo(176 + total / 2, 0);
    wctx.stroke();
    if (second == '05') {
        wctx.fillStyle = "#000";
        wctx.font = "10px";
        wctx.fillText(`${hour}:${minute}:00`, 300, 10);
    }
    const wd = wctx.getImageData(0, 0, 352, 150);
    wctx.clearRect(0, 0, 352, 150);
    wctx.putImageData(wd, 0, 1);
    document.getElementById('colors').innerHTML = `<span style='color: red;'>赤:${type.R} </span><span style='color: #d1d14d;'>黄:${type.Y} </span><span style='color: green;'>緑:${type.G} </span><span style='color: blue;'>青:${type.B} </span><span style='color: black;'>失敗:${type.F} </span><span style='color:black;'>合計:${type.T} </span>`;
    document.getElementById('inttx').innerHTML = "画像更新間隔：" + document.getElementById('intval').value + "秒";
}
mainint = setInterval(main, document.getElementById('intval').value * 1000);