function TruncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  }

  const rules = ["vtubers:", "partners:", "software:", "guides:"];

  const errorMessages = {
    NO_RESULTS: `<div class="search-result no-results">
  <p class="no-results-message">No results found for <strong>%{query}</strong></p>
</div>`,
  };

  async function search() {
    const searchInput = document.getElementById("searchInput");
    const searchQuery = searchInput.value;
    const resultsContainer = document.getElementById("results");

    if (!searchQuery) {
      // Clear the results cleanly
      resultsContainer.innerHTML = "";
      return;
    }

    // Clear the results cleanly

    resultsContainer.innerHTML = "";

    const reqData = await fetch("/api/search/q").then((res) => res.json());
    const results = reqData.data;

    let noResultsFound = true; // Flag to check if no results are found in any iteration
    const uniqueResults = new Set(); // Use a Set to store unique results

    // Check if the search query is a rule
    for (const rule of rules) {
      if (searchQuery.startsWith(rule)) {
        const obj = results[rule.replace(":", "")];

        if (Array.isArray(obj)) {
          const regex = new RegExp(
            searchQuery.replace(rule, "").trim(),
            "gi"
          );
          const filtered = obj.filter((item) => item.name.match(regex));

          if (filtered.length > 0) {
            // Add unique results to the Set
            filtered.forEach((item) => uniqueResults.add(item.link));
            noResultsFound = false; // Results found, set the flag to false
          }
        }
      } else {
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
      }
    }

    // If no results found in any iteration, show the "No results found" message
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

      // Add unique results outside the loop
      window.location.hash = searchQuery.replace(/\s/g, "+");
      AddData(uniqueResultsArray);
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
      const template = `<div class="search-result" style="border: 1px solid ${
        item.border_color ? item.border_color : "#7289da"
      };">
<img src="${item.image || "/images/logo.png"}" loading="lazy" alt="Favicon" class="favicon">
<div class="result-info">
  <h3 class="result-name"><a href="${item.link}" target="_blank">${
    item.name || "Unknown"
  }</a></h3>
  <p class="result-link">${item.link}</p>
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

  function AutoFill() {
    const searchInput = document.getElementById("searchInput");
    const searchQuery = window.location.hash.replace("#", "");
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

  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      search();
    }
  });

  window.addEventListener("load", () => {
    AutoFill();
    search();
  });