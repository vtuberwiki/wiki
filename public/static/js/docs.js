const H2 = document.querySelectorAll("h2");
const H3 = document.querySelectorAll("h3");
const VIDEOS = document.querySelectorAll("video");

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

for (let i = 0; i < VIDEOS.length; i++) {
    const current = VIDEOS[i];

    current.style.marginBottom = "10px";
    current.style.borderRadius = "10px";
}

window.onload = function () {
    if (window.location.hash) {
        ScrollTo(window.location.hash.substring(1));
    }

    const Headers = document.getElementsByClassName("article-content")[0]
        .querySelectorAll("h1, h2, h3, h4, h5, h6");

    Headers.forEach((header) => {
        const id = header.textContent
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");

        header.id = id;

        const headerType = header.tagName.toLowerCase();

        // Define sizes based on header type
        const size = {
            h1: { width: "48", height: "48" },
            h2: { width: "40", height: "40" },
            h3: { width: "32", height: "32" },
            h4: { width: "24", height: "24" },
            h5: { width: "20", height: "20" },
            h6: { width: "16", height: "16" },
        };

        const link = document.createElement("a");
        link.href = `#${id}`;
        link.classList.add("anchor");
        // Use the size based on header type
        link.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="${size[headerType].width}" height="${size[headerType].height}" fill="black" class="bi bi-hash" viewBox="0 0 16 16">
    <path d="M8.39 12.648a1.32 1.32 0 0 0-.015.18c0 .305.21.508.5.508.266 0 .492-.172.555-.477l.554-2.703h1.204c.421 0 .617-.234.617-.547 0-.312-.188-.53-.617-.53h-.985l.516-2.524h1.265c.43 0 .618-.227.618-.547 0-.313-.188-.524-.618-.524h-1.046l.476-2.304a1.06 1.06 0 0 0 .016-.164.51.51 0 0 0-.516-.516.54.54 0 0 0-.539.43l-.523 2.554H7.617l.477-2.304c.008-.04.015-.118.015-.164a.512.512 0 0 0-.523-.516.539.539 0 0 0-.531.43L6.53 5.484H5.414c-.43 0-.617.22-.617.532 0 .312.187.539.617.539h.906l-.515 2.523H4.609c-.421 0-.609.219-.609.531 0 .313.188.547.61.547h.976l-.516 2.492c-.008.04-.015.125-.015.18 0 .305.21.508.5.508.265 0 .492-.172.554-.477l.555-2.703h2.242l-.515 2.492zm-1-6.109h2.266l-.515 2.563H6.859l.532-2.563z"/>
  </svg>`;

        // Insert the link and svg before the text content
        header.insertBefore(link, header.firstChild);
        header.insertBefore(document.createTextNode(" "), header.firstChild);
    });

}
