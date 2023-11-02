
function ReplaceTrailingSlash(str) {
    return str.replace(/\/$/, "");
}

function HELLO() {
    const menu_items = document.querySelectorAll(".menu-item");

    for (let i = 0; i < menu_items.length; i++) {
        const item = menu_items[i];
        const href = item.querySelector("a").href;

        if (
            ReplaceTrailingSlash(href.replace(window.location.origin, "")) ===
            ReplaceTrailingSlash(window.location.pathname)
        ) {
            item.classList.add("active");
        }
    }
}

setTimeout(HELLO, 100);