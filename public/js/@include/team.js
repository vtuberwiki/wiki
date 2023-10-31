(async function () {
    try {
        const response = await fetch('/api/authors.json');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const contributors = await response.json();

        const length = contributors.data.length;

        document.getElementById('contributors_description').innerHTML = ` We are a team of ${length} contributor${length > 1 ? 's' : ''}.`;

        let contributorsHTML = ''; // Initialize an empty string to accumulate HTML

        for (const contributor of contributors.data) {
            contributorsHTML += `<div>
                <div class="vw-card">
                    <img loading="lazy" class="vw-border-circle" src="${contributor.avatar_url}" alt="${contributor.login}" />
                    <h5 class="vw-margin-remove-bottom vw-margin-top"><a href="${contributor.html_url}" target="_blank">@${contributor.login}</a></h5>
                </div>
            </div>`;
        }

        // Update the element's innerHTML once after the loop
        document.getElementById('contributors-container').innerHTML = contributorsHTML;

    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
