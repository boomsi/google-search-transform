let page = document.getElementById("radioDiv");
let selectedLangClassName = "currentLang";
const presetLanguage = ['Default', 'Simple Chinese', 'English']

// Reacts to a button click by marking marking the selected button and saving
// the selection
function handleButtonClick(event) {
  // Remove styling from the previously selected color
  let current = event.target.parentElement.querySelector(
    `.${selectedClassName}`
  );
  if (current && current !== event.target) {
    current.classList.remove(selectedClassName);
  }

  // Mark the button as selected
  let color = event.target.dataset.color;
  event.target.classList.add(selectedClassName);
  chrome.storage.sync.set({ color });
}

function handleLanguageClick(event) {
  console.log(event.target.value)
}

function constructOption(langs) {
  chrome.storage.sync.get('language', (data) => {
    let currentLang = data.language
    for(let lang of langs) {
      let wrapper = document.createElement('div')

      wrapper.innerHTML = `
        <input type='radio' id=${lang} name='language' value=${lang} ${lang === currentLang && 'checked'} />
        <label for=${lang}>${lang}</label>
      `
      if (currentLang === lang) {
        wrapper.classList.add(selectedLangClassName)
      }
      page.appendChild(wrapper)
    }

    let target = [...document.getElementsByTagName('input')]
    for(let item of target) {
      item.addEventListener('click', handleLanguageClick)
    }
  })
}

// Initialize the page by constructing the color options
constructOption(presetLanguage)