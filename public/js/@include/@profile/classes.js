function CreateElement(name, Class) {
    if (!customElements.get(name)) {
        customElements.define(name, Class);
    } else {
        throw new Error(`Element ${name} already defined`);
    }
}


class CarrdComponent extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });
        const name = this.getAttribute("name");

        const iframe = document.createElement("iframe");

        iframe.style.width = "1000px";
        iframe.style.height = "500px";
        iframe.style.position = "relative";
        iframe.frameBorder = "0";
        iframe.src = `https://${name}.carrd.co`;
        iframe.id = `carrd-${name}`;

        shadow.appendChild(iframe);
    }
}

class Quote extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });
        
        const quote = this.innerHTML;

        const quoteElement = document.createElement("p");

        quoteElement.innerHTML = `“${quote}”`;

        shadow.appendChild(quoteElement);
    }
}


/* Define elements */

CreateElement("carrd-profile", CarrdComponent);
CreateElement("quote-profile", Quote);