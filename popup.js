const langDiv = document.getElementById("langDiv");
const reg = /lr=((?!&)[A-Za-z0-9_-]){0,}.*/;

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

langDiv.addEventListener("click", async (e) => {
  const key = e.target.id !== "all" ? e.target.id : "";
  const path = e.target.dataset?.path;
  const { id, url } = await getCurrentTab();

  // engine
  if (path) {
    const { host } = new URL(url);
    const detail = ENGINE.find((item) => host.includes(item.key));
    const searchKey = url.match(detail.reg);
    if (searchKey) {
      chrome.tabs.update(id, { url: `${path}${searchKey[0]}` });
      return;
    }
  }

  // language
  const target = url.match(reg)
    ? url.replace(reg, `lr=${key}`)
    : `${url}&lr=${key}`;

  chrome.tabs.update(id, { url: target });
});

function renderSelectItem() {
  const robitLanguage = navigator.language;

  chrome.storage.sync.get("language", ({ language }) => {
    const fg = document.createDocumentFragment();

    insertLang(fg, language, robitLanguage);
    insertEngine(fg);

    langDiv.append(fg);
  });
}

function insertLang(fg, language, robitLanguage) {
  const target = language.sort((a, b) => a.key - b.key);
  for (let item of target) {
    const oItem = document.createElement("div");
    oItem.innerText = robitLanguage === "zh-CN" ? item.text : item.text_en;
    oItem.id = item.value;
    fg.append(oItem);
  }
}

function insertEngine(fg) {
  for (let item of ENGINE) {
    const oItem = document.createElement("div");
    oItem.innerText = item.name;
    oItem.id = item.key;
    oItem.setAttribute("data-path", item.path);
    fg.append(oItem);
  }
}

renderSelectItem();
