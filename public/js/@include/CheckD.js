function replaceCheckboxesWithImages() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');

        checkboxes.forEach(checkbox => {
            if (checkbox.hasAttribute('checked') && checkbox.hasAttribute('disabled')) {
              checkbox.outerHTML = '<img src="/design/yes.jpg" width="25" height="25">';
            } else if (checkbox.hasAttribute('disabled')) {
                checkbox.outerHTML = '<img src="/design/no.jpg" width="25" height="25">';
            }
        });
    }
    replaceCheckboxesWithImages();
