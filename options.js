let page = document.getElementById("radioDiv");
let selectedLangClassName = "currentLang";
const presetLanguage = ["Default"];

function handleLanguageClick(event) {
  const value = event.target?.attributes?.[0]?.value;
  const field = event.target.dataset.field

  if ([...event.target?.classList].includes("checked")) {
    event.target.classList.remove("checked");
    chrome.storage.sync.get("language", ({ language }) => {
      chrome.storage.sync.set({
        language: language.filter((i) => i !== value),
      });
    });
  } else {
    event.target.classList.add("checked");
    chrome.storage.sync.get("language", ({ language }) => {
      chrome.storage.sync.set({
        language: [...language, value],
      });
    });
  }
}

function constructOption(langs) {
  chrome.storage.sync.get("language", (data) => {
    let currentLang = data.language;
    const wrapper = document.createElement("ul");

    for (let item of LIST) {
      const { text, value } = item;
      const oItem = document.createElement("li");
      oItem.innerText = text;
      oItem.setAttribute("value", value);
      oItem.setAttribute('data-field', JSON.stringify(item))
      currentLang?.includes(value) && oItem.classList.add("checked");
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
constructOption(presetLanguage);
