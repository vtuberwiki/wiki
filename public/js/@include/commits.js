(async () => {
    const snackbar = document.getElementById("snackbar");

    // function AddGithubData(commit) {
    //   const currentTime = new Date().getTime();
    //   localStorage.setItem("X-GitHub-Commit", commit);
    //   localStorage.setItem("X-GitHub-Commit-Time", currentTime.toString());
    // }

    // function CheckIfShouldShow() {
    //   // Check if X-GitHub-Commit exists and if it less than 5 minutes
    //   const commit = localStorage.getItem("X-GitHub-Commit");

    //   if (commit) {
    //     const commitTime = localStorage.getItem("X-GitHub-Commit-Time");
    //     const currentTime = new Date().getTime();
    //     const diff = currentTime - parseInt(commitTime);

    //     if (diff < 300000) {
    //       return false;
    //     } else {
    //       return true;
    //     }
    //   } else {
    //     return true;
    //   }
    // }

    // const shouldShow = CheckIfShouldShow();

    // if (shouldShow) {
    //   fetch("https://api.github.com/repos/vtuberwiki/wiki/commits")
    //     .then((res) => res.json())
    //     .then((data) => {
    //       const commit = data[0];
    //       const sha = commit.sha;
    //       const message = commit.commit.message;
    //       snackbar.innerHTML = `Latest Commit: <a href="https://github.com/vtuberwiki/wiki/commit/${sha}" style="color: white;">${message}</a>`;
    //       snackbar.classList.add("show");

    //       AddGithubData(sha);

    //       setTimeout(() => {
    //         snackbar.classList.remove("show");
    //       }, 2700);
    //     });
    // }

    function getTime() {
      const timeLocal = localStorage.getItem("X-GitHub-Time");

      if (!timeLocal) return 3000;
      else return parseInt(timeLocal);
    }

    snackbar.innerHTML = `Check out the latest commit: <a href="https://github.com/vtuberwiki/wiki/commits/main" style="color: white;">branch/main</a>`;

    snackbar.classList.add("show");

    setTimeout(() => {
      snackbar.classList.remove("show");
    }, getTime());
  })();