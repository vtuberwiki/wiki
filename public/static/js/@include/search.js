/**
 * Object containing error messages.
 * @typedef {Object} ErrorMessages
 * @property {string} NO_RESULTS - Error message for no search results.
 */

/**
 * @type {ErrorMessages}
 */
const errorMessages = {
  NO_RESULTS: `<div class="search-result no-results">
    <p class="no-results-message">No results found for <strong>%{query}</strong></p>
  </div>`,
};

/**
 * Replaces spaces in a string with plus signs.
 * @param {string} string - The input string.
 * @returns {string} The modified string.
 */
function replaceSpaceWithPlus(string) {
  return string.replace(/\s/g, "+");
}

/**
 * Searches for results based on the query.
 * @param {Object} reqData - The request data.
 * @param {string} query - The search query.
 */
async function search(reqData, query) {
  console.debug("search called with query:", query);
  let searchQuery = query;
  const resultsContainer = document.getElementById("results");

  if (searchQuery.includes("+")) {
    searchQuery = searchQuery.replace(/\+/g, " ");
  }

  resultsContainer.innerHTML = "";

  const results = reqData;
  let noResultsFound = true;
  const uniqueResults = new Set();

  const regex = new RegExp(searchQuery, "gi");

  for (const key in results) {
    const obj = results[key];

    if (Array.isArray(obj)) {
      const filtered = obj.filter((item) => item.name.match(regex));

      if (filtered.length > 0) {
        filtered.forEach((item) => uniqueResults.add(item.link));
        noResultsFound = false;
      }
    }
  }

  window.history.replaceState({}, '', `?q=${encodeURIComponent(query)}`);
  if (noResultsFound) {
    console.warn("No results found for query:", query);
    resultsContainer.innerHTML = errorMessages.NO_RESULTS.replace(
      "%{query}",
      `${searchQuery}`
    );
  } else {
    const uniqueResultsArray = Array.from(uniqueResults).map((link) => {
      for (const key in results) {
        const obj = results[key];
        const foundItem = obj.find((item) => item.link === link);
        if (foundItem) {
          return foundItem;
        }
      }
    });

    resultsContainer.innerHTML = "";
    addData(uniqueResultsArray);
    document.getElementById("res_banner").scrollIntoView();
  }
}

/**
 * Formats a date to a specific string format.
 * @param {string} date - The date to format.
 * @returns {string} The formatted date string.
 */
function formatDate(date) {
  const d = new Date(date);
  const month = d.toLocaleString("default", { month: "long" });
  const day = d.getDate();
  const year = d.getFullYear();
  return `${month} ${day}, ${year}`;
}

/**
 * Creates an array of social links.
 * @param {string[]} links - The array of social links.
 * @returns {Object[]} The array of social objects.
 */
function createSocials(links) {
  return Array.isArray(links)
    ? links.map((link) => ({
        url: link,
        iconUppercase:
          link
            .split("https://")
            .pop()
            .split(".")[0]
            .charAt(0)
            .toUpperCase() +
          link.split("https://").pop().split(".")[0].slice(1),
      }))
    : [];
}

/**
 * Adds skeleton elements to the results container.
 * @param {number} length - The number of skeleton elements to add.
 */
function addSkeletons(length) {
  const resultsContainer = document.getElementById("results");
  const skeletonTemplate = `<div class="skeleton-loader">
    <div class="skeleton-favicon"></div>
    <div class="skeleton-info">
      <div class="skeleton-name"></div>
      <div class="skeleton-link"></div>
      <div class="skeleton-description"></div>
      <div class="skeleton-meta">
        <div class="skeleton-date"></div>
      </div>
      <div class="skeleton-links">
        <a href="#" class="skeleton-link"></a>
        <a href="#" class="skeleton-link"></a>
        <a href="#" class="skeleton-link"></a>
      </div>
    </div>
    <div class="skeleton-cloud"></div>
  </div>`;

  for (let i = 0; i < length; i++) {
    resultsContainer.innerHTML += skeletonTemplate;
  }
}

/**
 * Determines whether to show links based on the query parameters.
 * @type {boolean}
 */
const showLink =
  new URLSearchParams(window.location.search).get("sl") === "";

/**
 * Adds data to the results container.
 * @param {Object[]} data - The array of data to add.
 */
function addData(data) {
  const resultsContainer = document.getElementById("results");

  if (data.length === 0) {
    const template = errorMessages.NO_RESULTS.replace(
      "%{query}",
      searchInput.value
    );

    if (resultsContainer.innerHTML.trim() === "") {
      resultsContainer.innerHTML = template;
    }

    return;
  }

  data.forEach((item) => {
    const template = `<div class="search-result" style="border: 1px solid ${
      item.border_color ? item.border_color : "#7289da"
    };">
      <img src="${item.image || "/static/images/logo.png"}" loading="lazy" alt="Favicon" class="favicon">
      <div class="result-info">
        <h3 class="result-name"><a href="${item.link}" target="_blank">${item.name || "Unknown"}</a></h3>
        <p class="result-link">${showLink ? item.link : item.link.replace("https://vtubers.wiki", "~")}</p>
        <p class="result-description">${item.description || "Unknown"}</p>
        <div class="result-meta">
          <span class="result-date">${formatDate(item.date)}</span>
          <span class="tag-cloud">${item.category}</span>
        </div>
      </div>
    </div>`;

    resultsContainer.innerHTML += template;
  });
}

/**
 * The search input element.
 * @type {HTMLInputElement}
 */
const searchInput = document.getElementById("search");

/**
 * Debounces a function.
 * @param {function} func - The function to debounce.
 * @param {number} delay - The delay in milliseconds.
 * @returns {function} The debounced function.
 */
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    console.debug("Debouncing function call");
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

/**
 * The delayed search function.
 * @type {function}
 */
const delayedSearch = debounce(async (query) => {
  console.debug("delayedSearch called with query:", query);
  const reqData = await fetch(`/api/v1/search/q`).then((res) => res.json());
  await search(reqData, query);
}, 500);

searchInput.addEventListener("input", (e) => {
  const query = e.target.value;

  window.history.replaceState({}, '', `?q=${encodeURIComponent(replaceSpaceWithPlus(query))}`);

  if (query.length === 0) {
    document.getElementById("results").innerHTML = "";
    return;
  }

  document.getElementById("results").innerHTML = "";

  addSkeletons(5);

  delayedSearch(query);
});

/**
 * Autofills the search input based on query parameters.
 */
function autoFill() {
  const searchInput = document.getElementById("search");
  const searchQuery = replaceSpaceWithPlus(new URLSearchParams(window.location.search).get("q"));
  const removeWhiteSpace =
    new URLSearchParams(window.location.search).get("rm") === "";

  if (searchQuery) {
    searchInput.value = searchQuery.replace(/\+/g, " ");
    if (removeWhiteSpace) {
      searchInput.value = searchInput.value.replace(/\s/g, "");
    }
  } else {
    searchInput.value = "";
  }
}

window.addEventListener("load", async () => {
  autoFill();
  const searchQuery = new URLSearchParams(window.location.search).get("q");
  if (searchQuery && searchQuery !== "") {
    const reqData = await fetch(`/api/v1/search/q`).then((res) =>
      res.json()
    );
    await search(reqData, searchQuery);
  }
});
