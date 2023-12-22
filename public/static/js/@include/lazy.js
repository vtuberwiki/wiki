// Get every image
const images = document.querySelectorAll("img");

images.forEach(image => {
  // Check if the image has 'loading' attribute set to 'lazy'
  if (image.getAttribute('loading') !== 'lazy') {
    // If not, set the 'loading' attribute to 'lazy'
    image.setAttribute('loading', 'lazy');
  }
});