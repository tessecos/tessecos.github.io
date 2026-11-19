/* Shows one language per page: Chinese when the browser's preferred language
   is Chinese, English otherwise. The nav button switches by hand and the
   choice is remembered on this device. Elements marked class="zh" or
   class="en" belong to one language; everything else is shared. */
(function () {
  var root = document.documentElement, key = "tessecos-lang", lang = null;
  try { lang = localStorage.getItem(key); } catch (e) {}
  if (lang !== "zh" && lang !== "en") {
    var prefs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ""];
    lang = /^zh\b/i.test(prefs[0] || "") ? "zh" : "en";
  }
  var style = document.createElement("style");
  style.textContent = "html.zh .en,html.en .zh{display:none!important}" +
    ".lang-switch{cursor:pointer;border:1px solid var(--line);border-radius:999px;padding:0 14px;text-decoration:none}";
  document.head.appendChild(style);

  function apply(value) {
    root.classList.remove("zh", "en");
    root.classList.add(value);
    root.lang = value === "zh" ? "zh-Hans" : "en";
    var title = root.getAttribute("data-title-" + value);
    if (title) document.title = title;
  }
  apply(lang);

  document.addEventListener("click", function (event) {
    var target = event.target.closest && event.target.closest("[data-lang-switch]");
    if (!target) return;
    event.preventDefault();
    lang = lang === "zh" ? "en" : "zh";
    try { localStorage.setItem(key, lang); } catch (e) {}
    apply(lang);
  });
})();
