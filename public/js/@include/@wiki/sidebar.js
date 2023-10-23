function ReplaceTrailingSlash(str) {
    return str.replace(/\/$/, "");
  }
  function HELLO() {
    const sidebar_items = document.querySelectorAll(".sidebar_item");
  
    for (let i = 0; i < sidebar_items.length; i++) {
      const sidebar_item = sidebar_items[i];
      const href = sidebar_item.querySelector("a").href;
  
      if (
        ReplaceTrailingSlash(href.replace(window.location.origin, "")) ===
        ReplaceTrailingSlash(window.location.pathname)
      ) {
        sidebar_item.classList.add("vw-active");
      }
    }
  }
  
  setTimeout(HELLO, 100);