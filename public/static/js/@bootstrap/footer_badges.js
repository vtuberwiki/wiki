// Get every image in in div with the id of "code-badges"

const code_images = document.querySelectorAll("#code-badges img");

code_images.forEach(image => {
    image.addEventListener("click", () => {
        window.open(image.getAttribute("data-url"), "_blank");
    })
});
