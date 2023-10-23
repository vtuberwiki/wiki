const H2 = document.querySelectorAll("h2");
const H3 = document.querySelectorAll("h3");

for (let i = 0; i < H2.length; i++) {
    H2[i].insertAdjacentHTML("afterend", "<hr />");
}