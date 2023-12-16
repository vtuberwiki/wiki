var converter = new showdown.Converter();

const content = document.querySelectorAll(".article-content");

content.forEach((item) => {
    item.innerHTML = converter.makeHtml(item.innerHTML);
})