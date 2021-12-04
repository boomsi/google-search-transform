const ENGINE = [
  {
    name: "Baidu",
    key: "baidu",
    path: "https://www.baidu.com/s?wd=",
    reg: /(?<=wd=)((?!&)[\S]){0,}/,
  },
  {
    name: "Google",
    key: "google",
    path: "https://www.google.com/search?q=",
    reg: /(?<=q=)((?!&)[\S]){0,}/,
  },
];
