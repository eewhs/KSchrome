chrome.action.onClicked.addListener(() => {
  chrome.windows.create({
    url: "../html/kyoshin.html",
    type: "popup",
    width: 365,
    height: 650
  })
})
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("quakeAlarm", { periodInMinutes: 0.5 });
});
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "quakeAlarm") {
  }
});
function wsconnect() {
  console.log('websocketに接続します。');
  let ws = new WebSocket("wss://ws-api.wolfx.jp/jma_eew");
  ws.onopen = () => {
    console.log("websocket接続完了");
  };
  ws.onmessage = (event) => {
    let data = JSON.parse(event.data);
    console.log(data);
    chrome.runtime.sendMessage({ txt: data });
    if (chrome.runtime.lastError) {
      console.warn('タブにコンテンツスクリプトが存在しませんでした。', chrome.runtime.lastError.message);
      return;
    }
  }
  ws.onerror = (error) => {
    console.log(error);
  }
  ws.onclose = () => {
    console.warn("websocket切断");
    setTimeout(wsconnect, 40000);
  };
};
wsconnect();