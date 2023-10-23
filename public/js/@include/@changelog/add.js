const changelogUrl = `https://storage.hylia.dev/json/vtuber-wiki/changelog`;

(async () => {
    try {
        const response = await fetch(changelogUrl);

        const bootstrap = {
            labels: {
                added: `<p><span class="vw-label" style="background-color: #3778ff"><i class="bi bi-plus-circle"></i> Added</span></p>`,
                changed: `<p><span class="vw-label" style="background-color: #3aaa55"><i class="bi bi-question-lg"></i> Changed</span></p>`,
                deprecated: `<p><span class="vw-label" style="background-color: #333333"><i class="bi bi-exclamation-triangle"></i> Deprecated</span></p>`,
                fixed: `<p><span class="vw-label" style="background-color: #ff4772"><i class="bi bi-lightbulb"></i> Fixed</span></p>`,
                removed: `<p><span class="vw-label" style="background-color: #ff3333"><i class="bi bi-dash-circle"></i> Removed</span></p>`,
                security: `<p><span class="vw-label" style="background-color: #fb3434"><i class="bi bi-shield"></i> Security</span></p>`,
                unreleased: `<p><span class="vw-label" style="background-color: #a037ff"><i class="bi bi-slash-lg"></i> Unreleased</span></p>`
            }
        }

        const data = await response.json();

        if (!data || data.length === 0) {
            document.querySelector(".article-content").innerHTML = "No changelog entries found.";
        }

        data.forEach((entry) => {
            const date = new Date(entry.date);
            const userLocale = navigator.language;
            const formattedDate = new Intl.DateTimeFormat(userLocale).format(date)

            document.querySelector(".article-content").innerHTML += `<article class="vw-article vw-margin-medium-top">
        <hr class="vw-margin-medium-bottom">
        <div class="vw-position-relative">
          <h2>${entry.name} <span style="color: #dcddde; opacity: 0.9; font-size: 0.6em;">(${entry.codename})</span></h2>
          <div class="vw-position-center-left-out vw-position-large vw-visible@m vw-text-small vw-text-muted">
            <time datetime="${date}">
              ${formattedDate}
            </time>
          </div>
          <div class="vw-hidden@m vw-text-small vw-text-muted vw-margin-bottom">
            <time datetime="${date}">
              ${formattedDate}
            </time>
          </div>
        </div>
        <div class="article-content">
          ${entry.text}
          <br />
          ${entry.log.added ? `
            ${bootstrap.labels.added}
            <ul>
                ${entry.log.added.map((item) => `<li>${item}</li>`).join("")}
            </ul>
            ` : ""}

            ${entry.log.changed ? `
            ${bootstrap.labels.changed} 
            <ul>
                ${entry.log.changed.map((item) => `<li>${item}</li>`).join("")}
            </ul>
            ` : ""}

            ${entry.log.deprecated ? `
            ${bootstrap.labels.deprecated}
            <ul>
                ${entry.log.deprecated.map((item) => `<li>${item}</li>`).join("")}
            </ul>
            ` : ""}

            ${entry.log.removed ? `
            ${bootstrap.labels.removed}
            <ul>
                ${entry.log.removed.map((item) => `<li>${item}</li>`).join("")}
            </ul>
            ` : ""}

            ${entry.log.fixed ? `
            ${bootstrap.labels.fixed}
            <ul>
                ${entry.log.fixed.map((item) => `<li>${item}</li>`).join("")}
            </ul>
            ` : ""}

            ${entry.log.security ? `
            ${bootstrap.labels.security}
            <ul>
                ${entry.log.security.map((item) => `<li>${item}</li>`).join("")}
            </ul>
            ` : ""}

            ${entry.log.unreleased ? `
            ${bootstrap.labels.unreleased}
            <ul>
                ${entry.log.unreleased.map((item) => `<li>${item}</li>`).join("")}
            </ul>
            ` : ""}
        </div>
      </article>`;
        });
    } catch (error) {
        console.error('An error occurred:', error);
        document.querySelector(".article-content").innerHTML = "Failed to fetch changelog entries.";
    }
})();