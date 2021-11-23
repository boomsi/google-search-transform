const langDiv = document.getElementById("langDiv");
const reg = /lr=((?!&)[A-Za-z0-9_-]){0,}.*/;

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

langDiv.addEventListener("click", async (e) => {
  const lang = e.target.id !== "all" ? e.target.id : "";
  const { id, url } = await getCurrentTab();
  const target = url.match(reg)
    ? url.replace(reg, `lr=${lang}`)
    : `${url}&lr=${lang}`;

  chrome.tabs.update(id, { url: target });
});

function renderSelectItem() {
  const robitLanguage = navigator.language;

  chrome.storage.sync.get("language", ({ language }) => {
    if (!language.length) {
      const oItem = document.createElement("span");
      oItem.classList.add("empty-tips");
      oItem.innerText =
        robitLanguage === "zh-CN"
          ? "请在选项中预设需要的语言"
          : "Please select preset languages!";
      document.body.append(oItem);
      return;
    }

    const fg = document.createDocumentFragment();
    const target = language.sort((a, b) => a.key - b.key);

    for (let item of target) {
      const oItem = document.createElement("div");
      oItem.innerText = robitLanguage === "zh-CN" ? item.text : item.text_en;
      oItem.id = item.value;
      fg.append(oItem);
    }

    langDiv.append(fg);
  });
}

renderSelectItem();
