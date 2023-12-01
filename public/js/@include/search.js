const errorMessages = {
  NO_RESULTS: `<div class="search-result no-results">
<p class="no-results-message">No results found for <strong>%{query}</strong></p>
</div>`,
};

async function search(reqData, query) {
  const searchQuery = query;
  const resultsContainer = document.getElementById("results");

  // Clear the results cleanly

  resultsContainer.innerHTML = "";

  const results = reqData.data;

  let noResultsFound = true; // Flag to check if no results are found in any iteration
  const uniqueResults = new Set(); // Use a Set to store unique results

  const regex = new RegExp(searchQuery, "gi");

  for (const key in results) {
    const obj = results[key];

    if (Array.isArray(obj)) {
      const filtered = obj.filter((item) => item.name.match(regex));

      if (filtered.length > 0) {
        // Add unique results to the Set
        filtered.forEach((item) => uniqueResults.add(item.link));
        noResultsFound = false; // Results found, set the flag to false
      }
    }
  }

  // If no results found in any iteration, show the "No results found" message
  window.history.replaceState({}, '', `?q=${encodeURIComponent(query)}`);
  if (noResultsFound) {
    resultsContainer.innerHTML = errorMessages.NO_RESULTS.replace(
      "%{query}",
      `${searchQuery}`
    );
  } else {
    // Convert Set to an array and pass it to AddData
    const uniqueResultsArray = Array.from(uniqueResults).map((link) => {
      // Find the corresponding item in the results data
      for (const key in results) {
        const obj = results[key];
        const foundItem = obj.find((item) => item.link === link);
        if (foundItem) {
          return foundItem;
        }
      }
    });

    document.getElementById("results").innerHTML = "";
    AddData(uniqueResultsArray);
    document.getElementById("res_banner").scrollIntoView();
  }
}

function FormatDate(date) {
  // Make it like: December 29, 2023
  const d = new Date(date);
  const month = d.toLocaleString("default", { month: "long" });
  const day = d.getDate();
  const year = d.getFullYear();
  return `${month} ${day}, ${year}`;
}

function CreateSocials(links) {
  return Array.isArray(links)
    ? links.map((link) => {
      return {
        url: link,
        iconUppercase:
          link
            .split("https://")
            .pop()
            .split(".")[0]
            .charAt(0)
            .toUpperCase() +
          link.split("https://").pop().split(".")[0].slice(1),
      };
    })
    : [];
}

function AddSkeletons(length) {
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

const showLink =
  new URLSearchParams(window.location.search).get("sl") === "";

function AddData(data) {
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
    const template = `<div class="search-result" style="border: 1px solid ${item.border_color ? item.border_color : "#7289da"
      };">
<img src="${item.image || "/images/logo.png"
      }" loading="lazy" alt="Favicon" class="favicon">
<div class="result-info">
<h3 class="result-name"><a href="${item.link}" target="_blank">${item.name || "Unknown"
      }</a></h3>
<p class="result-link">${showLink ? item.link : item.link.replace("https://vtubers.wiki", "~")
      }</p>
<p class="result-description">${item.description || "Unknown"}</p>
<div class="result-meta">
<span class="result-date">${FormatDate(item.date)}</span>
<span class="tag-cloud">${item.category}</span>
</div>
</div>
</div>`;

    resultsContainer.innerHTML += template;
  });
}

const searchInput = document.getElementById("search");

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const delayedSearch = debounce(async (query) => {
  const reqData = await fetch(`/api/search/q`).then((res) => res.json());
  await search(reqData, query);
}, 500); // You can adjust the delay time (in milliseconds) as needed

searchInput.addEventListener("input", (e) => {
  const query = e.target.value;

  window.history.replaceState({}, '', `?q=${encodeURIComponent(query)}`);

  if (query.length === 0) {
    document.getElementById("results").innerHTML = "";
    return;
  }

  document.getElementById("results").innerHTML = "";

  AddSkeletons(5);

  delayedSearch(query);
});

function AutoFill() {
  const searchInput = document.getElementById("search");
  const searchQuery = new URLSearchParams(window.location.search).get("q");
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
  AutoFill();
  const SearchQuery = new URLSearchParams(window.location.search).get("q");
  if (SearchQuery) {
    if (SearchQuery !== "") {
      const reqData = await fetch(`/api/search/q`).then((res) =>
        res.json()
      );
      await search(reqData, SearchQuery);
    }
  }
});