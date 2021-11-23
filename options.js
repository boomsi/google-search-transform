let page = document.getElementById("radioDiv");
let selectedLangClassName = "currentLang";

function handleLanguageClick(event) {
  const value = event.target?.attributes?.[0]?.value;
  const field = JSON.parse(event.target.dataset.field);

  if ([...event.target?.classList].includes("checked")) {
    event.target.classList.remove("checked");
    chrome.storage.sync.get("language", ({ language }) => {
      chrome.storage.sync.set({
        language: language.filter((i) => i.value !== value),
      });
    });
  } else {
    event.target.classList.add("checked");
    chrome.storage.sync.get("language", ({ language }) => {
      chrome.storage.sync.set({
        language: [...language, field],
      });
    });
  }
}

function constructOption() {
  chrome.storage.sync.get("language", (data) => {
    let currentLang = data.language;
    const wrapper = document.createElement("ul");
    const robitLanguage = navigator.language

    for (let item of LIST) {
      const { text, text_en, value } = item;
      const oItem = document.createElement("li");
      oItem.innerText = robitLanguage === 'zh-CN' ? text : text_en;
      oItem.setAttribute("value", value);
      oItem.setAttribute("data-field", JSON.stringify(item));
      currentLang?.some((item) => item.value === value) &&
        oItem.classList.add("checked");
      wrapper.append(oItem);
    }

    page.appendChild(wrapper);

    let target = [...document.getElementsByTagName("li")];
    for (let item of target) {
      item.addEventListener("click", handleLanguageClick);
    }
  });
}

// Initialize the page by constructing the color options
constructOption();
