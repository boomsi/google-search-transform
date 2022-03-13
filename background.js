const DEFAULT = [
  {
    text: "默认",
    key: 1,
    value: "all",
    text_en: "Any language",
  },
  {
    text: "简体中文",
    key: 19,
    value: "lang_zh-CN",
    text_en: "Simplified Chinese",
  },
  {
    text: "英语",
    key: 46,
    value: "lang_en",
    text_en: "English",
  },
];

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ language: DEFAULT });
});

