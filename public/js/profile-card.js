class ProfileCard extends HTMLElement {
    constructor() {
        super();

        console.log(`This website is using the profile-card component from https://wiki.hylia.dev`);

        const name = this.getAttribute("name");

        const shadow = this.attachShadow({ mode: "open" });

        const IFrame = document.createElement("iframe");

        IFrame.style.width = this.getAttribute("width") || "100%";
        IFrame.style.height = this.getAttribute("height") || "100%";
        IFrame.style.position = this.getAttribute("position") || "relative";
        IFrame.frameBorder = this.getAttribute("frameBorder") || "0";
        IFrame.src = `https://wiki.hylia.dev/interface/${name}`;
        IFrame.classList.add("vtuber-card");

        shadow.appendChild(IFrame);

        this.addEventListener("click", (e) => {
            e.preventDefault();
            window.open(`https://wiki.hylia.dev/interface/${name}`, "_blank");
        });
    }
}

if (!customElements.get("profile-card")) {
    customElements.define("profile-card", ProfileCard);
} else {
    console.warn("ProfileCard already defined");
}