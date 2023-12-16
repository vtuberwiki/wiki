(async () => {
    try {
      const response = await fetch("/api/v1/socials.json");
      const data = await response.json();
  
      data.forEach(social => {
        const linkElement = document.createElement("a");
        linkElement.href = social.href;
        linkElement.title = social.name;
        linkElement.style.marginRight = "5px";
        linkElement.style.textDecoration = "none";
        linkElement.target = "_blank";
        linkElement.rel = "noopener noreferrer";
  
        const imgElement = document.createElement("img");
        imgElement.src = social.icon;
        imgElement.alt = social.name;
        imgElement.title = social.name;
        imgElement.className = "vw-icon-link vw-icon";
        imgElement.width = 24;
        imgElement.height = 24;
  
        linkElement.appendChild(imgElement);
  
        document.getElementById("foot_so").appendChild(linkElement);
      });
    } catch (error) {
      console.error("Error fetching or parsing socials.json:", error);
    }
  })();