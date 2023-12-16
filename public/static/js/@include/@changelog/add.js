/**
 * /public/js/@include/faq.js
 */

var converter = new showdown.Converter();

const content = document.querySelectorAll(".article-content-base");

content.forEach((item) => {
    item.innerHTML = converter.makeHtml(item.innerHTML);
})