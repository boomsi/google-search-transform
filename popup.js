// Initialize butotn with users's prefered color
let langDiv = document.getElementById("langDiv");
const reg = /lr=((?!&)[A-Za-z0-9_-])+/;

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

langDiv.addEventListener("click", async (e) => {
  const lang = e.target.id === "Chinese" ? "zh-CN" : "en";
  const { id, url } = await getCurrentTab();
  const target = url.match(reg)
    ? url.replace(reg, `lr=lang_${lang}`)
    : `${url}&lr=lang_${lang}`;

  chrome.tabs.update(id, { url: target });
});
