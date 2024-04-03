function getAllTextNodes(node) {
    var allTextNodes = [];

    function getTextNodes(node) {
        if (node.nodeType == 3) {
            allTextNodes.push(node);
        } else if (node.nodeName !== "SCRIPT" && node.nodeName !== "STYLE") {
            for (var i = 0; i < node.childNodes.length; i++) {
                getTextNodes(node.childNodes[i]);
            }
        }
    }

    getTextNodes(node);
    return allTextNodes;
}

function Replace() {
    const infoElement = document.querySelector("#vt-info");
    const info = JSON.parse(infoElement.innerHTML);

    const replacers = {
        "@wiki::slug": info.slug,
        "@wiki::author": info.author,
    };

    var textNodes = getAllTextNodes(document.body);

    textNodes.forEach(function (node) {
        Object.keys(replacers).forEach(function (key) {
            const regex = new RegExp("\\" + key, "g");
            if (regex.test(node.nodeValue)) {
                node.nodeValue = node.nodeValue.replace(regex, replacers[key]);
            }
        });
    });

    const videos = document.querySelectorAll("video");
    videos.forEach(function (video) {
        const sources = video.querySelectorAll("source");
        sources.forEach(function (source) {
            Object.keys(replacers).forEach(function (key) {
                const attrValue = source.getAttribute("src");
                if (attrValue && attrValue.includes(key)) {
                    const newSrc = attrValue.replace(
                        new RegExp("\\" + key, "g"),
                        replacers[key]
                    );
                    source.setAttribute("src", newSrc);
                    video.load();
                }

            });
        });
    });

    const images = document.querySelectorAll("img");
    images.forEach(function (image) {
        Object.keys(replacers).forEach(function (key) {
            const attrValue = image.getAttribute("src");
            if (attrValue && attrValue.includes(key)) {
                const newSrc = attrValue.replace(
                    new RegExp("\\" + key, "g"),
                    replacers[key]
                );

                image.onload = function () {
                    this.onload = null;
                };
                image.setAttribute("src", newSrc);
            }
        });
    });
}

window.addEventListener("DOMContentLoaded", async (e) => {
    await Replace();
});