const H2 = document.querySelectorAll("h2");
const H3 = document.querySelectorAll("h3");

function ScrollTo(id) {
    const element = document.getElementById(id);

    if (element) {
        window.scrollTo({
            top: element.offsetTop - 100,
            behavior: "smooth"
        });

        element.style.animation = "blink 1s infinite";
        setTimeout(() => {
            element.style.backgroundColor = "";
            element.style.animation = "";
        }, 1700);
    }
}

function AddHash(id, el) {
    if (!id) throw new Error("No id provided");
    if (!el) throw new Error("No element provided");

    el.onclick = function () {
        window.location.hash = id;
    }
}

for (let i = 0; i < H2.length; i++) {
    const current = H2[i];
    const id = current.id;
    current.insertAdjacentHTML("afterend", "<hr />");
    current.style.textAlign = "center";
    current.style.fontWeight = "bold";
    AddHash(id, current);
}

for (let i = 0; i < H3.length; i++) {
    const current = H3[i];
    const id = current.id;
    AddHash(id, current);
}

window.onload = function () {
    if (window.location.hash) {
        ScrollTo(window.location.hash.substring(1));
    }
}
